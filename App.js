
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Home from './src/views/Home'
import { Provider } from 'react-redux'
import store from './store'
import Todo from "./src/navigation";


const App: () => React$Node = () => {
  return (
    <Provider store={store} >
      <Todo>
        <StatusBar translucent={false} backgroundColor="white" barStyle="dark-content" />
        <Home />
      </Todo>
    </Provider>
  );
};

export default App;
