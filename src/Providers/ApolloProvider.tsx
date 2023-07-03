import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import Loader from "Components/common/Loader";
import { createUploadLink } from "apollo-upload-client";
import { LocalForageWrapper, persistCache } from "apollo3-cache-persist";
import OfflineLink from "gql/offline-link";
import localforage from "localforage";
import { useEffect, useState } from "react";

export default function DataProvider({ children }) {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const storage = localforage.createInstance({ name: "offline" });
    const httpLink = createUploadLink({
      uri: "" + "/gql",
    });
    const offlineLink = new OfflineLink({
      storage: storage,
      email: "",
    });

    const cache = new InMemoryCache();
    const client = new ApolloClient({
      link: ApolloLink.from([offlineLink, httpLink]),
      cache,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: "cache-and-network",
        },
        query: {
          fetchPolicy: "cache-and-network" as any,
        },
      },
    });

    persistCache({
      cache,
      storage: new LocalForageWrapper(storage),
      maxSize: false,
    }).then(() => setClient(client));

    offlineLink.setup(client);

    return () => {};
  }, []);
  if (!client) return <Loader />;

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
