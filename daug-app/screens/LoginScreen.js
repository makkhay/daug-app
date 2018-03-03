import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';

import SocialFeedScreen from '../screens/SocialFeedScreen'
// import Icon from 'react-native-vector-icons';





export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      screen: null,
    };
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
      this.setState({ screen: 'SocialFeedScreen' });

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
        <View style = {styles.inputFieldContainer}>
        {/* <Icon style={styles.searchIcon} name="ios-search" size={20} color="#000"/> */}
        <TextInput
          style={styles.textInput}
          underlineColorAndroid={'transparent'}
          // inlineImageLeft='lock'
          placeholder="Email"
          placeholderTextColor="white"
          selectionColor="white"
          inputStyle={{ color: 'white', fontSize: 16 }}
          value={this.state.email}
          onChangeText={(text) => this.setState({email: text})}
          //call handle submit to display an alert
          onSubmitEditing={this.handleSubmit}
        />

       <TextInput
          style={styles.textInput}
          underlineColorAndroid={'transparent'}
          placeholder="Password"
          placeholderTextColor="white"
          selectionColor="white"
          inputStyle={{ color: 'white', fontSize: 16 }}
          value={this.state.password}
          onChangeText={(text) => this.setState({password: text})}
          //call handle submit to display an alert
          onSubmitEditing={this.handleSubmit}
        />

        <TouchableOpacity
          style={[styles.toggleButton, !this.loginValid() && { backgroundColor: 'black'}] }
          onPress={this.loginButtonPressed.bind(this)}>
         <Text style={styles.toggleText}> Login </Text>
       </TouchableOpacity>

        </View>
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
    padding: 20,
    marginTop: 40,
    alignItems: 'center',
   
    
  },
  textInput : {
    height: 50,
    width: 300,
    paddingLeft: 8,
    borderRadius: 53,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 10,
    color: 'white',


      
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
  },

});
