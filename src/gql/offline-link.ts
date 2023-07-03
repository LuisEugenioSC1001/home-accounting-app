import {
  ApolloClient,
  ApolloLink,
  DocumentNode,
  gql,
  NextLink,
  Observable,
  Operation,
} from "@apollo/client";
import localforage from "localforage";
import {
  has,
  isEmpty,
  isString,
  mapValues,
  omitBy,
  reduce,
  values,
} from "lodash";
import { nanoid } from "nanoid";

interface Attempt {
  mutation: DocumentNode;
  variables: Record<string, any>;
  optimisticResponse: any;
}

const syncStatusQuery = gql`
  query syncStatus {
    mutations
    inflight
  }
`;

export default class OfflineLink extends ApolloLink {
  client: ApolloClient<any>;
  storage: typeof localforage;
  sequential: boolean;
  retryOnServerError: boolean;
  queue: Map<string, Attempt>;
  delayedSync: any;
  prefix: string;
  email: string;
  constructor({ storage, retryOnServerError = false, email }) {
    super();
    window.addEventListener("online", () => this.sync());

    if (!storage) {
      throw new Error(
        "Storage is required, it can be an AsyncStorage compatible storage instance."
      );
    }

    this.storage = storage;
    this.retryOnServerError = retryOnServerError;
    this.queue = new Map();
    this.prefix = "offline-";
    this.email = email;
  }

  request(operation: Operation, forward: NextLink) {
    const context = operation.getContext();
    if (operation.query.loc.source.body.includes(" create")) {
      operation.variables = {
        ...operation?.variables,
        input: {
          ...operation?.variables?.input,
          CreatedBy: this.email,
          ModifiedBy: this.email,
        },
      };
    }
    if (operation.query.loc.source.body.includes(" update")) {
      operation.variables = {
        ...operation?.variables,
        input: {
          ...operation?.variables?.input,
          ModifiedBy: this.email,
        },
      };
    }
    if (!context.optimisticResponse) {
      // If the mutation does not have an optimistic response then we don't defer it
      return forward(operation);
    }

    return new Observable((observer) => {
      const attemptId = this.add({
        variables: operation.variables,
        optimisticResponse: context.optimisticResponse,
        mutation: operation.query,
      });

      const subscription = forward(operation).subscribe({
        next: (result) => {
          // Mutation was successful so we remove it from the queue since we don't need to retry it later
          this.remove(attemptId);

          observer.next(result);
        },

        error: async (networkError) => {
          // Mutation failed so we try again after a certain amount of time.
          // this.delayedSync();

          // Resolve the mutation with the optimistic response so the UI can be updated
          observer.next({
            data: context.optimisticResponse,
            dataPresent: true,
            errors: [],
          });

          // Say we're all done so the UI is re-rendered.
          observer.complete();
        },

        complete: () => observer.complete(),
      });

      return () => {
        subscription.unsubscribe();
      };
    });
  }

  /**
   * Obtains the queue of mutations that must be sent to the server.
   * These are kept in a Map to preserve the order of the mutations in the queue.
   */
  async getQueue() {
    return new Promise<Map<any, any>>((resolve, reject) => {
      // Get all attempt Ids
      this.storage
        .getItem<string>(this.prefix + "AttemptIds")
        .then((storedIds) => {
          const map = new Map();

          if (storedIds) {
            const storedAttemptIds = storedIds.split(",");

            storedAttemptIds.forEach((storedId, index) => {
              // Get file of name '<prefix><UUID>'
              this.storage
                .getItem<string>(this.prefix + storedId)
                .then((stored) => {
                  map.set(storedId, stored);

                  // We return the map
                  if (index === storedAttemptIds.length - 1) {
                    resolve(map);
                  }
                });
            });
          } else {
            resolve(map);
          }
        })
        .catch((err) => {
          // Most likely happens the first time a mutation attempt is being persisted.
          resolve(new Map());
        });
    });
  }

  /**
   * Persist the queue so mutations can be retried at a later point in time.
   */
  saveQueue(attemptId?, item?) {
    if (attemptId && item) {
      this.queue.set(attemptId, item);

      this.storage.setItem(this.prefix + attemptId, item);
    }

    // Saving Ids file
    this.storage.setItem(
      this.prefix + "AttemptIds",
      [...this.queue.keys()].join()
    );

    this.updateStatus(false);
  }

  /**
   * Updates a SyncStatus object in the Apollo Cache so that the queue status can be obtained and dynamically updated.
   */
  updateStatus(inflight) {
    this.client.writeQuery({
      query: syncStatusQuery,
      data: {
        __typename: "SyncStatus",
        mutations: this.queue.size,
        inflight,
      },
    });
  }

  /**
   * Add a mutation attempt to the queue so that it can be retried at a later point in time.
   */
  add(item: Attempt) {
    // We give the mutation attempt a random id so that it is easy to remove when needed (in sync loop)
    const attemptId = nanoid(5);

    this.saveQueue(attemptId, item);

    return attemptId;
  }

  /**
   * Remove a mutation attempt from the queue.
   */
  remove(attemptId) {
    this.queue.delete(attemptId);

    this.storage.removeItem(this.prefix + attemptId);

    this.saveQueue();
  }

  /**
   * Takes the mutations in the queue and try to send them to the server again.
   */
  async sync() {
    const queue = this.queue;

    if (queue.size < 1) {
      // There's nothing in the queue to sync, no reason to continue.

      return;
    }
    // Update the status to be "in progress"
    this.updateStatus(true);

    const attempts = Array.from(queue);

    // Retry the mutations in the order in which they were originally executed
    for (const [attemptId, attempt] of attempts) {
      const success = await this.client
        .mutate({ ...attempt, optimisticResponse: undefined })
        .then(async ({ data, errors }) => {
          // Mutation was successfully executed so we remove it from the queue
          if (!isEmpty(errors)) {
            const failed: any[] = (await this.storage.getItem("failed")) || [];
            this.storage.setItem("failed", failed.concat(attempt));

            this.remove(attemptId);

            return true;
          }

          const ids = reduce(
            omitBy(attempt.optimisticResponse, isString),
            (prev, curr, key) =>
              has(curr, "id") ? { ...prev, [curr.id]: data[key].id } : prev,
            {}
          );
          if (!isEmpty(ids))
            queue.forEach((item, id) => {
              if (id == attemptId) return;
              if (has(item.variables, "input")) {
                const included = values(item.variables.input).some(
                  (val) => val in ids
                );
                if (included) {
                  item.variables.input = mapValues(
                    item.variables.input,
                    (value) => (value in ids ? ids[value] : value)
                  );
                  this.saveQueue(id, item);
                }
              }
              if (has(item.variables, "id")) {
                const varId = item.variables.id;
                if (!(varId in ids)) return;
                item.variables.id = ids[varId];
                this.saveQueue(id, item);
              }
            });

          this.remove(attemptId);
          return true;
        })
        .catch(async (err) => {
          if (
            this.retryOnServerError === false &&
            has(err, "networkError.response")
          ) {
            // There are GraphQL errors, which means the server processed the request so we can remove the mutation from the queue

            const failed: any[] = (await this.storage.getItem("failed")) || [];
            this.storage.setItem("failed", failed.concat(attempt));

            this.remove(attemptId);

            return true;
          } else {
            // There was a network error so we have to retry the mutation

            return false;
          }
        });
      if (!success) {
        // The last mutation failed so we don't attempt any more
        break;
      }
    }

    // Remaining mutations in the queue are persisted
    this.saveQueue();
  }

  /**
   * Configure the link to use Apollo Client and immediately try to sync the queue (if there's anything there).
   */
  async setup(client) {
    this.client = client;
    this.queue = await this.getQueue();

    return await this.sync();
  }
}

export { syncStatusQuery };
