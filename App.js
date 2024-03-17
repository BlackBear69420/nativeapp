import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import MyStore from './src/redux/MyStore';

const App = () => {
  return (
    <Provider store={MyStore}>
      <StatusBar backgroundColor="#FA6857" barStyle="light-content" />
      <AppNavigator />
    </Provider>
  );
};

export default App;
