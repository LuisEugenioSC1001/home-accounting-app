import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  JSON: any;
  MongoID: any;
  RegExpAsString: any;
};

export type CreateOneMovementInput = {
  createdBy?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['Date']>;
  name?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['Float']>;
};

export type CreateOneMovementPayload = {
  __typename?: 'CreateOneMovementPayload';
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
  /** Created document */
  record?: Maybe<Movement>;
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
};

export type ErrorInterface = {
  /** Generic error message */
  message?: Maybe<Scalars['String']>;
};

export type FilterFindManyMovementCreatedByOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  regex?: InputMaybe<Scalars['RegExpAsString']>;
};

export type FilterFindManyMovementDateOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  ne?: InputMaybe<Scalars['Date']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
};

export type FilterFindManyMovementInput = {
  AND?: InputMaybe<Array<FilterFindManyMovementInput>>;
  OR?: InputMaybe<Array<FilterFindManyMovementInput>>;
  _id?: InputMaybe<Scalars['MongoID']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindManyMovementOperatorsInput>;
  createdBy?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['Date']>;
  name?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['Float']>;
};

export type FilterFindManyMovementNameOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  regex?: InputMaybe<Scalars['RegExpAsString']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyMovementOperatorsInput = {
  _id?: InputMaybe<FilterFindManyMovement_IdOperatorsInput>;
  createdBy?: InputMaybe<FilterFindManyMovementCreatedByOperatorsInput>;
  date?: InputMaybe<FilterFindManyMovementDateOperatorsInput>;
  name?: InputMaybe<FilterFindManyMovementNameOperatorsInput>;
  value?: InputMaybe<FilterFindManyMovementValueOperatorsInput>;
};

export type FilterFindManyMovementValueOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

export type FilterFindManyMovement_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['MongoID']>;
  gte?: InputMaybe<Scalars['MongoID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
  lt?: InputMaybe<Scalars['MongoID']>;
  lte?: InputMaybe<Scalars['MongoID']>;
  ne?: InputMaybe<Scalars['MongoID']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']>>>;
};

export type MongoError = ErrorInterface & {
  __typename?: 'MongoError';
  /** MongoDB error code */
  code?: Maybe<Scalars['Int']>;
  /** MongoDB error message */
  message?: Maybe<Scalars['String']>;
};

export type Movement = {
  __typename?: 'Movement';
  _id: Scalars['MongoID'];
  createdBy?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create one document with mongoose defaults, setters, hooks and validation */
  createMovement?: Maybe<CreateOneMovementPayload>;
  /** Remove one document: 1) Retrieve one document and remove with hooks via findByIdAndRemove. 2) Return removed document. */
  deleteMovement?: Maybe<RemoveByIdMovementPayload>;
  /** Update one document: 1) Retrieve one document by findById. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  updateMovement?: Maybe<UpdateByIdMovementPayload>;
};


export type MutationCreateMovementArgs = {
  record: CreateOneMovementInput;
};


export type MutationDeleteMovementArgs = {
  _id: Scalars['MongoID'];
};


export type MutationUpdateMovementArgs = {
  _id: Scalars['MongoID'];
  record: UpdateByIdMovementInput;
};

export type Query = {
  __typename?: 'Query';
  movement?: Maybe<Movement>;
  movements: Array<Movement>;
};


export type QueryMovementArgs = {
  _id: Scalars['MongoID'];
};


export type QueryMovementsArgs = {
  filter?: InputMaybe<FilterFindManyMovementInput>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SortFindManyMovementInput>;
};

export type RemoveByIdMovementPayload = {
  __typename?: 'RemoveByIdMovementPayload';
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
  /** Removed document */
  record?: Maybe<Movement>;
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
};

export type RuntimeError = ErrorInterface & {
  __typename?: 'RuntimeError';
  /** Runtime error message */
  message?: Maybe<Scalars['String']>;
};

export enum SortFindManyMovementInput {
  CreatedbyAsc = 'CREATEDBY_ASC',
  CreatedbyDesc = 'CREATEDBY_DESC',
  DateAsc = 'DATE_ASC',
  DateDesc = 'DATE_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  ValueAsc = 'VALUE_ASC',
  ValueDesc = 'VALUE_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export type UpdateByIdMovementInput = {
  createdBy?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['Date']>;
  name?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['Float']>;
};

export type UpdateByIdMovementPayload = {
  __typename?: 'UpdateByIdMovementPayload';
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
  /** Updated document */
  record?: Maybe<Movement>;
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
};

export type ValidationError = ErrorInterface & {
  __typename?: 'ValidationError';
  /** List of validator errors */
  errors?: Maybe<Array<ValidatorError>>;
  /** Combined error message from all validators */
  message?: Maybe<Scalars['String']>;
};

export type ValidatorError = {
  __typename?: 'ValidatorError';
  /** Input record idx in array which occurs the validation error. This `idx` is useful for createMany operation. For singular operations it always be 0. For *Many operations `idx` represents record index in array received from user. */
  idx: Scalars['Int'];
  /** Validation error message */
  message?: Maybe<Scalars['String']>;
  /** Source of the validation error from the model path */
  path?: Maybe<Scalars['String']>;
  /** Field value which occurs the validation error */
  value?: Maybe<Scalars['JSON']>;
};

export type MovementFragFragment = { __typename: 'Movement', _id: any, createdBy?: string | null, date?: any | null, name?: string | null, value?: number | null };

export type CreateMovementMutationVariables = Exact<{
  record: CreateOneMovementInput;
}>;


export type CreateMovementMutation = { __typename?: 'Mutation', createMovement?: { __typename: 'CreateOneMovementPayload', record?: { __typename: 'Movement', _id: any, createdBy?: string | null, date?: any | null, name?: string | null, value?: number | null } | null } | null };

export type MovementsListQueryVariables = Exact<{
  filter?: InputMaybe<FilterFindManyMovementInput>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type MovementsListQuery = { __typename?: 'Query', movements: Array<{ __typename: 'Movement', _id: any, createdBy?: string | null, date?: any | null, name?: string | null, value?: number | null }> };

export type MovemenByIdQueryVariables = Exact<{
  id: Scalars['MongoID'];
}>;


export type MovemenByIdQuery = { __typename?: 'Query', movement?: { __typename: 'Movement', _id: any, createdBy?: string | null, date?: any | null, name?: string | null, value?: number | null } | null };

export type DeleteMovementMutationVariables = Exact<{
  id: Scalars['MongoID'];
}>;


export type DeleteMovementMutation = { __typename?: 'Mutation', deleteMovement?: { __typename: 'RemoveByIdMovementPayload', record?: { __typename: 'Movement', _id: any, createdBy?: string | null, date?: any | null, name?: string | null, value?: number | null } | null } | null };

export type UpdateMovementMutationVariables = Exact<{
  id: Scalars['MongoID'];
  record: UpdateByIdMovementInput;
}>;


export type UpdateMovementMutation = { __typename?: 'Mutation', updateMovement?: { __typename: 'UpdateByIdMovementPayload', record?: { __typename: 'Movement', _id: any, createdBy?: string | null, date?: any | null, name?: string | null, value?: number | null } | null } | null };

export const MovementFragFragmentDoc = gql`
    fragment movementFrag on Movement {
  __typename
  _id
  createdBy
  date
  name
  value
}
    `;
export const CreateMovementDocument = gql`
    mutation createMovement($record: CreateOneMovementInput!) {
  createMovement(record: $record) {
    __typename
    record {
      ...movementFrag
    }
  }
}
    ${MovementFragFragmentDoc}`;
export type CreateMovementMutationFn = Apollo.MutationFunction<CreateMovementMutation, CreateMovementMutationVariables>;

/**
 * __useCreateMovementMutation__
 *
 * To run a mutation, you first call `useCreateMovementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMovementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMovementMutation, { data, loading, error }] = useCreateMovementMutation({
 *   variables: {
 *      record: // value for 'record'
 *   },
 * });
 */
export function useCreateMovementMutation(baseOptions?: Apollo.MutationHookOptions<CreateMovementMutation, CreateMovementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMovementMutation, CreateMovementMutationVariables>(CreateMovementDocument, options);
      }
export type CreateMovementMutationHookResult = ReturnType<typeof useCreateMovementMutation>;
export type CreateMovementMutationResult = Apollo.MutationResult<CreateMovementMutation>;
export type CreateMovementMutationOptions = Apollo.BaseMutationOptions<CreateMovementMutation, CreateMovementMutationVariables>;
export const MovementsListDocument = gql`
    query movementsList($filter: FilterFindManyMovementInput, $limit: Int, $skip: Int) {
  movements(filter: $filter, limit: $limit, skip: $skip) {
    ...movementFrag
  }
}
    ${MovementFragFragmentDoc}`;

/**
 * __useMovementsListQuery__
 *
 * To run a query within a React component, call `useMovementsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useMovementsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMovementsListQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useMovementsListQuery(baseOptions?: Apollo.QueryHookOptions<MovementsListQuery, MovementsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MovementsListQuery, MovementsListQueryVariables>(MovementsListDocument, options);
      }
export function useMovementsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MovementsListQuery, MovementsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MovementsListQuery, MovementsListQueryVariables>(MovementsListDocument, options);
        }
export type MovementsListQueryHookResult = ReturnType<typeof useMovementsListQuery>;
export type MovementsListLazyQueryHookResult = ReturnType<typeof useMovementsListLazyQuery>;
export type MovementsListQueryResult = Apollo.QueryResult<MovementsListQuery, MovementsListQueryVariables>;
export const MovemenByIdDocument = gql`
    query movemenById($id: MongoID!) {
  movement(_id: $id) {
    ...movementFrag
  }
}
    ${MovementFragFragmentDoc}`;

/**
 * __useMovemenByIdQuery__
 *
 * To run a query within a React component, call `useMovemenByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useMovemenByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMovemenByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMovemenByIdQuery(baseOptions: Apollo.QueryHookOptions<MovemenByIdQuery, MovemenByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MovemenByIdQuery, MovemenByIdQueryVariables>(MovemenByIdDocument, options);
      }
export function useMovemenByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MovemenByIdQuery, MovemenByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MovemenByIdQuery, MovemenByIdQueryVariables>(MovemenByIdDocument, options);
        }
export type MovemenByIdQueryHookResult = ReturnType<typeof useMovemenByIdQuery>;
export type MovemenByIdLazyQueryHookResult = ReturnType<typeof useMovemenByIdLazyQuery>;
export type MovemenByIdQueryResult = Apollo.QueryResult<MovemenByIdQuery, MovemenByIdQueryVariables>;
export const DeleteMovementDocument = gql`
    mutation deleteMovement($id: MongoID!) {
  deleteMovement(_id: $id) {
    __typename
    record {
      ...movementFrag
    }
  }
}
    ${MovementFragFragmentDoc}`;
export type DeleteMovementMutationFn = Apollo.MutationFunction<DeleteMovementMutation, DeleteMovementMutationVariables>;

/**
 * __useDeleteMovementMutation__
 *
 * To run a mutation, you first call `useDeleteMovementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMovementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMovementMutation, { data, loading, error }] = useDeleteMovementMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMovementMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMovementMutation, DeleteMovementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMovementMutation, DeleteMovementMutationVariables>(DeleteMovementDocument, options);
      }
export type DeleteMovementMutationHookResult = ReturnType<typeof useDeleteMovementMutation>;
export type DeleteMovementMutationResult = Apollo.MutationResult<DeleteMovementMutation>;
export type DeleteMovementMutationOptions = Apollo.BaseMutationOptions<DeleteMovementMutation, DeleteMovementMutationVariables>;
export const UpdateMovementDocument = gql`
    mutation updateMovement($id: MongoID!, $record: UpdateByIdMovementInput!) {
  updateMovement(_id: $id, record: $record) {
    __typename
    record {
      ...movementFrag
    }
  }
}
    ${MovementFragFragmentDoc}`;
export type UpdateMovementMutationFn = Apollo.MutationFunction<UpdateMovementMutation, UpdateMovementMutationVariables>;

/**
 * __useUpdateMovementMutation__
 *
 * To run a mutation, you first call `useUpdateMovementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMovementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMovementMutation, { data, loading, error }] = useUpdateMovementMutation({
 *   variables: {
 *      id: // value for 'id'
 *      record: // value for 'record'
 *   },
 * });
 */
export function useUpdateMovementMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMovementMutation, UpdateMovementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMovementMutation, UpdateMovementMutationVariables>(UpdateMovementDocument, options);
      }
export type UpdateMovementMutationHookResult = ReturnType<typeof useUpdateMovementMutation>;
export type UpdateMovementMutationResult = Apollo.MutationResult<UpdateMovementMutation>;
export type UpdateMovementMutationOptions = Apollo.BaseMutationOptions<UpdateMovementMutation, UpdateMovementMutationVariables>;