import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default () => (
  <View style={styles.centered}>
    <ActivityIndicator size="large" color='#ff5dc8' />
  </View>
)

const styles = StyleSheet.create({
  
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  header: {
    fontWeight: 'bold',
  },
  subheader: {
    paddingTop: 10,
  },
})