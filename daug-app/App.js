import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import RootNavigator from './navigation/RootNavigator';

import Home from './navigation/HomeTabs'



export default class App extends React.Component {

  render() {
   return(
     <RootNavigator/>
    //  <Home/>
  
  
   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
