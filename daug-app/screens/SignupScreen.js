import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert  } from 'react-native';

export default class SignupScreen extends React.Component {
 
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  signUpButtonPressed(){
    const { name, email, password } = this.state;

    return (
      Alert.alert(
        'Success! Your login: ',
        `Name: ${name}\nEmail: ${email}\nPassword: ${password}`,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      )
    )

  }

  loginValid() {
    const { email, password } = this.state

    return email.length > 0 && password.length > 0
  }


  render() {
    return (
      <View style={styles.mainContainer}>
       <View style = {styles.inputFieldContainer}>
         <TextInput
          style={styles.textInput}
          underlineColorAndroid={'transparent'}
          placeholder="Name"
          placeholderTextColor="white"
          selectionColor="white"
          value={this.state.name}
          onChangeText={(text) => this.setState({name: text})}
          //call handle submit to display an alert
          onSubmitEditing={this.handleSubmit}
        />

       <TextInput
          style={styles.textInput}
          underlineColorAndroid={'transparent'}
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
          disabled={!this.loginValid()}
          onPress={this.signUpButtonPressed.bind(this)}>
         <Text style={styles.toggleText}> Sign Up </Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },
  textInput : {
    height: 50,
    width: 300,
    paddingLeft: 8,
    borderRadius: 53,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 10,
    color: 'white'

      
  },
  toggleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#01579B',
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
