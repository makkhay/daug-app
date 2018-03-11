import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';

import SocialFeedScreen from '../screens/SocialFeedScreen'
// import Icon from 'react-native-vector-icons';


import { Button, Input } from 'react-native-elements';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';

import { Font } from 'expo';


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


  loginButtonPressed() {
    const { email, password } = this.state;
    
    if (email.length === 0 && password.length === 0) {
      Alert.alert(
        'Error!',
        `Your email or password is empty `,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      )
    }
    else if(this.loginValid){
     
      this.props.navigation.navigate('Home')

      Alert.alert(
        'Success! Your login: ',
        `Email: ${email}  \nPassword: ${password}`,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      )
    
    }
  }
  loginValid() {
    const {  email, password } = this.state

    return email.length > 0 && password.length > 0
  }
  


  render() {
    const { screen } = this.state

    if (screen === 'SocialFeedScreen') {
      return <SocialFeedScreen />;
    }

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
            value={this.state.email}
            onChangeText={(text) => this.setState({email: text})}
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
            value={this.state.password}
            onChangeText={(text) => this.setState({password: text})}
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
