import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  orphanages: Array<Orphanage>;
  findOrphanageById?: Maybe<Orphanage>;
};


export type QueryFindOrphanageByIdArgs = {
  id: Scalars['String'];
};

export type Orphanage = {
  __typename?: 'Orphanage';
  id: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  whatsapp: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  about: Scalars['String'];
  instructions: Scalars['String'];
  openingHours: Scalars['String'];
  openOnWeekends: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type Mutation = {
  __typename?: 'Mutation';
  createOrphanage: Orphanage;
};


export type MutationCreateOrphanageArgs = {
  options: OrphanageInsertInput;
};

export type OrphanageInsertInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  whatsapp: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  about: Scalars['String'];
  instructions: Scalars['String'];
  openingHours: Scalars['String'];
  openOnWeekends: Scalars['Boolean'];
};

export type CreateOrphanageMutationVariables = Exact<{
  options: OrphanageInsertInput;
}>;


export type CreateOrphanageMutation = (
  { __typename?: 'Mutation' }
  & { createOrphanage: (
    { __typename?: 'Orphanage' }
    & Pick<Orphanage, 'id' | 'name' | 'email' | 'whatsapp' | 'latitude' | 'longitude' | 'about' | 'instructions' | 'openingHours' | 'openOnWeekends'>
  ) }
);

export type OrphanagesQueryVariables = Exact<{ [key: string]: never; }>;


export type OrphanagesQuery = (
  { __typename?: 'Query' }
  & { orphanages: Array<(
    { __typename?: 'Orphanage' }
    & Pick<Orphanage, 'id' | 'name' | 'email' | 'whatsapp' | 'latitude' | 'longitude' | 'about' | 'instructions' | 'openingHours' | 'openOnWeekends'>
  )> }
);

export type FindOrphanageByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FindOrphanageByIdQuery = (
  { __typename?: 'Query' }
  & { findOrphanageById?: Maybe<(
    { __typename?: 'Orphanage' }
    & Pick<Orphanage, 'id' | 'name' | 'email' | 'whatsapp' | 'latitude' | 'longitude' | 'about' | 'instructions' | 'openingHours' | 'openOnWeekends'>
  )> }
);


export const CreateOrphanageDocument = gql`
    mutation CreateOrphanage($options: OrphanageInsertInput!) {
  createOrphanage(options: $options) {
    id
    name
    email
    whatsapp
    latitude
    longitude
    about
    instructions
    openingHours
    openOnWeekends
  }
}
    `;
export type CreateOrphanageMutationFn = Apollo.MutationFunction<CreateOrphanageMutation, CreateOrphanageMutationVariables>;

/**
 * __useCreateOrphanageMutation__
 *
 * To run a mutation, you first call `useCreateOrphanageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrphanageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrphanageMutation, { data, loading, error }] = useCreateOrphanageMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateOrphanageMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrphanageMutation, CreateOrphanageMutationVariables>) {
        return Apollo.useMutation<CreateOrphanageMutation, CreateOrphanageMutationVariables>(CreateOrphanageDocument, baseOptions);
      }
export type CreateOrphanageMutationHookResult = ReturnType<typeof useCreateOrphanageMutation>;
export type CreateOrphanageMutationResult = Apollo.MutationResult<CreateOrphanageMutation>;
export type CreateOrphanageMutationOptions = Apollo.BaseMutationOptions<CreateOrphanageMutation, CreateOrphanageMutationVariables>;
export const OrphanagesDocument = gql`
    query orphanages {
  orphanages {
    id
    name
    email
    whatsapp
    latitude
    longitude
    about
    instructions
    openingHours
    openOnWeekends
  }
}
    `;

/**
 * __useOrphanagesQuery__
 *
 * To run a query within a React component, call `useOrphanagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrphanagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrphanagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrphanagesQuery(baseOptions?: Apollo.QueryHookOptions<OrphanagesQuery, OrphanagesQueryVariables>) {
        return Apollo.useQuery<OrphanagesQuery, OrphanagesQueryVariables>(OrphanagesDocument, baseOptions);
      }
export function useOrphanagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrphanagesQuery, OrphanagesQueryVariables>) {
          return Apollo.useLazyQuery<OrphanagesQuery, OrphanagesQueryVariables>(OrphanagesDocument, baseOptions);
        }
export type OrphanagesQueryHookResult = ReturnType<typeof useOrphanagesQuery>;
export type OrphanagesLazyQueryHookResult = ReturnType<typeof useOrphanagesLazyQuery>;
export type OrphanagesQueryResult = Apollo.QueryResult<OrphanagesQuery, OrphanagesQueryVariables>;
export const FindOrphanageByIdDocument = gql`
    query findOrphanageById($id: String!) {
  findOrphanageById(id: $id) {
    id
    name
    email
    whatsapp
    latitude
    longitude
    about
    instructions
    openingHours
    openOnWeekends
  }
}
    `;

/**
 * __useFindOrphanageByIdQuery__
 *
 * To run a query within a React component, call `useFindOrphanageByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOrphanageByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOrphanageByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOrphanageByIdQuery(baseOptions: Apollo.QueryHookOptions<FindOrphanageByIdQuery, FindOrphanageByIdQueryVariables>) {
        return Apollo.useQuery<FindOrphanageByIdQuery, FindOrphanageByIdQueryVariables>(FindOrphanageByIdDocument, baseOptions);
      }
export function useFindOrphanageByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOrphanageByIdQuery, FindOrphanageByIdQueryVariables>) {
          return Apollo.useLazyQuery<FindOrphanageByIdQuery, FindOrphanageByIdQueryVariables>(FindOrphanageByIdDocument, baseOptions);
        }
export type FindOrphanageByIdQueryHookResult = ReturnType<typeof useFindOrphanageByIdQuery>;
export type FindOrphanageByIdLazyQueryHookResult = ReturnType<typeof useFindOrphanageByIdLazyQuery>;
export type FindOrphanageByIdQueryResult = Apollo.QueryResult<FindOrphanageByIdQuery, FindOrphanageByIdQueryVariables>;