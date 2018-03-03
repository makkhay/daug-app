import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import IntroScreen from './screens/IntroScreen';
import SocialFeedScreen from './screens/SocialFeedScreen';
import ProfileScreen from './screens/ProfileScreen'
import LoginScreen from './screens/LoginScreen'






export default class App extends React.Component {

 
  render() {
   return(
    <View style={styles.container}>
     {/* <ProfileScreen/>  */}
    <SocialFeedScreen/> 
    {/* <IntroScreen/> */}
    {/* <Demo/> */}
    {/* <LoginScreen/> */}
  </View>
   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
