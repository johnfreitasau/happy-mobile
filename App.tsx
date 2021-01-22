import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, DefaultOptions } from '@apollo/client';
import Routes from './src/routes';
import { Platform } from 'react-native';

  export const App: React.FC = () => {

  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore"
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    }
  }

  const client = new ApolloClient({
    uri: Platform.OS === 'ios' ? 'http://localhost:4000/graphql' : 'http://192.168.1.107:4000/graphql',
    credentials: 'include',
    cache: new InMemoryCache(),
    defaultOptions
  });

  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
};

export default App;