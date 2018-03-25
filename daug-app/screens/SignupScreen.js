import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert  } from 'react-native';
import { LinearGradient, Font } from 'expo';
import { Button, Input } from 'react-native-elements';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import IntroScreen from '../screens/IntroScreen';
import { onSignIn } from '../util/helper';

export default class SignupScreen extends React.Component {

  static navigationOptions = {
    title: 'Signup',
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
      name: '',
      email: '',
      password: '',
      isLoading: false,
      screen: null,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'OpenSans-SemiBoldItalic': require('../assets/fonts/OpenSans-SemiBoldItalic.ttf')
    });
    this.setState({ fontLoaded: true });

  }


  async signupButtonPressed() {

    this.setState({ isLoading: true })

    const { name, email, password } = this.state
    const { navigate } = this.props.navigation

    var details = {
      'name': name,
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
      let response = await fetch(`https://daug-app.herokuapp.com/auth/signup`, {
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
          'Signed Up!',
          'You have successfully signed up!',
          [
            { text: "Continue", onPress: () => onSignIn(responseJSON.user.id).then(() => navigate("Home") ) }
            
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors })
        Alert.alert('Sign up failed!', `Unable to signup.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      console.log(error)

      Alert.alert('Sign up failed!', 'Unable to Signup. Please try again later')
    }
  }

  loginValid() {
    const { email, password } = this.state

    return email.length > 0 && password.length > 0
  }


  render() {
    const { screen } = this.state
    const { name, email, password } = this.state

    
    return (
      <View style={styles.mainContainer}>
         {this.state.fontLoaded &&
       <View style = {styles.inputFieldContainer}>

          <Input
	           placeholder='Name'
          	 placeholderTextColor="white"
	          inputStyle={{ color: "white"}}
	          autoCapitalize="none"
          	autoCorrect={false}
            returnKeyType="next"
            value={this.state.name}
            onChangeText={(text) => this.setState({name: text})}
            onSubmitEditing={this.handleSubmit}
           	containerStyle={styles.textInput}
             leftIcon={
              <MaterialCommunityIcons
              name="contacts"
              size={24}
              color="white"
	
	           />
           	}
           />

        <Input
	           placeholder='Email'
          	 placeholderTextColor="white"
	          inputStyle={{ color: "white"}}
	          autoCapitalize="none"
          	autoCorrect={false}
            returnKeyType="next"
            value={this.state.email}
            onChangeText={(text) => this.setState({email: text})}
            onSubmitEditing={this.handleSubmit}
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
            onSubmitEditing={this.handleSubmit}
           	containerStyle={styles.textInput}
            // If email input is wrong use: shake={true}
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
          disabled={!this.loginValid()}
          onPress= { () => {this.signupButtonPressed() ,console.log(name + email)}  } >
         <Text style={styles.toggleText}> Sign Up </Text>
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
    alignItems: 'center',
    marginVertical: 273,
    marginTop: 85,


    
  },
  textInput : {
    height: 50,
    width: 300,
    paddingLeft: 8,
    borderRadius: 53,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 10,


      
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
