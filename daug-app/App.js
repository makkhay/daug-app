import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import RootNavigator from './navigation/RootNavigator';

import Home from './navigation/HomeTabs'
import ProfileScreen from './screens/ProfileScreen'




export default class App extends React.Component {

  render() {
   return(
     <RootNavigator/>
    //  <Home/>
    // <CreatePost/>
    // <ProfileScreen/>
  
  
   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
