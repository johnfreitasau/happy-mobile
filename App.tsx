import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { useFonts } from 'expo-font';
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import Routes from './src/routes';
import { Platform } from 'react-native';

  export const App: React.FC = () => {

  const [fontsLoaded] = useFonts({
    nunito600: Nunito_600SemiBold, 
    nunito700: Nunito_700Bold, 
    nunito800: Nunito_800ExtraBold
  });

  if (!fontsLoaded) {
    return null;
  }

  // Initialise Apollo Client
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    // uri: 'http://192.168.1.255:4000/graphql',
    // uri: 'http://10.0.2.2:4000/graphql',
    // uri: `http://${
    //   Platform.OS === 'ios' ? 'localhost' : '192.168.1.255'
    // }:4000/`,
    credentials: 'include',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
};

export default App;