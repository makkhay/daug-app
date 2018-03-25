import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';

import SocialFeedScreen from '../screens/SocialFeedScreen'
// import Icon from 'react-native-vector-icons';


import { Button, Input } from 'react-native-elements';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';

import { Font } from 'expo';
import {onSignIn} from '../util/helper';


export default class LoginScreen extends React.Component {

  static navigationOptions = {
  
    title: 'Login',
    headerStyle : { backgroundColor: '#03A9F4', borderBottomWidth : 0},
    headerTintColor: 'white',
    headerTittleStyle: {color: '#03A9F4', fontSize: 32}
  };

  constructor(props) {
    super(props);

    state = {
      fontLoaded: false,
    };
    this.state = {
      email: '',
      password: '',
      screen: null,
    };
  }

  async componentDidMount() {
    
    await Font.loadAsync({
      'OpenSans-SemiBoldItalic': require('../assets/fonts/OpenSans-SemiBoldItalic.ttf')
    });
    this.setState({ fontLoaded: true });
  }

  async loginButtonPressed() {

    this.setState({ isLoading: true })

    const { email, password } = this.state
    const { navigate } = this.props.navigation

    var details = {
      'email': email,
      'password': password
    };

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      });

      let responseJSON = null

      if (response.status === 201) {
        responseJSON = await response.json();

        console.log(responseJSON)

        this.setState({ isLoading: false })
        Alert.alert(
          'Logged In!',
          'You have successfully logged in!',
          [
            { text: "Continue", onPress: () => onSignIn(responseJSON.user.id).then(() =>navigate("Home")) }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors })

        Alert.alert('Log in failed!', `Unable to login.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isLoading: false, error })

      Alert.alert('Log in failed!', 'Unable to login. Please try again later')
    }
  }

  loginValid() {
    const {  email, password } = this.state

    return email.length > 0 && password.length > 0
  }
  


  render() {
    const { screen } = this.state
    const { isLoading, errors } = this.state
    const { email, password } = this.state;

   

    return (

      
      <View style={styles.mainContainer}>
       {this.state.fontLoaded &&
        <View style = {styles.inputFieldContainer}>
         <Input
	           placeholder='Email'
          	 placeholderTextColor="white"
	          inputStyle={{ color: "white"}}
	          autoCapitalize="none"
          	autoCorrect={false}
            returnKeyType="next"
            value={email}
            onChangeText={email => this.setState({email})}
           	containerStyle={styles.textInput}
             leftIcon={
              <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="white"
	
	           />
           	}
           />



           <Input
	           placeholder='Password'
          	 placeholderTextColor="white"
	          inputStyle={{ color: "white"}}
	          autoCapitalize="none"
          	autoCorrect={false}
            returnKeyType="next"
            value={password}
            onChangeText={password => this.setState({password})}
           	containerStyle={styles.textInput}
             leftIcon={
              <MaterialCommunityIcons
              name="lock-outline"
              size={24}
              color="white"
	
	           />
           	}
           />

        <TouchableOpacity
          loading={isLoading}
          style={[styles.toggleButton, !this.loginValid() && { backgroundColor: 'black'}] }
          onPress={this.loginButtonPressed.bind(this)}>
         <Text style={styles.toggleText}> Login </Text>
        
       </TouchableOpacity>

        </View>
       } 
      </View>
     
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#03A9F4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputFieldContainer: {
    flexDirection: 'column',
    marginTop: 8,
    alignItems: 'center',
    marginVertical: 160
    
   
    
  },
  textInput : {
    height: 50,
    width: 300,
    borderRadius: 53,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 10,  
  },
  searchIcon: {
    padding: 10,
},
  toggleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 40,
    height: 50,
    width: 200,
    

  },
  toggleText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    fontFamily: 'OpenSans-SemiBoldItalic'
  },

});
