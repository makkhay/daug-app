import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

import LOGO from '../assets/daug_logo.png'
import { Font } from 'expo';


import ProfileScreen from '../screens/ProfileScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import SocialFeedScreen from '../screens/SocialFeedScreen';



export default class IntroScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    state = {
      fontLoaded: false,
    };

    this.state = {
      screen: null
      
    };
  }
  

  async componentDidMount() {
    await Font.loadAsync({
      'OpenSans-SemiBoldItalic': require('../assets/fonts/OpenSans-SemiBoldItalic.ttf')
    });
    this.setState({ fontLoaded: true });
    this.pingServer()

  }

  async pingServer() {
    // Check server status
    // Simple GET request to /api
    try {
      const response = await fetch(`https://daug-app.herokuapp.com/api`, {
        method: 'GET'
      });
      const responseJSON = await response.json();

      if (response.status === 200) {
        console.log(responseJSON.message);
        console.log('Server up and running');
      } else {
        const error = responseJSON.message

        console.log("Server request failed " + error);
      }
    } catch (error) {
      console.log("Server is down " + error);
    }
  }


  render(){
    const { screen } = this.state
    
 
    return (
      <View style = { styles.mainContainer}> 
        {this.state.fontLoaded &&
       <View style = { styles.bigImageContainer } >
        <Image
          source={LOGO}
          style={styles.logoImage} resizeMode="contain" />
          <Text style={styles.logoTitle}>DAUG</Text>
          
      </View >
        }
     
     {this.state.fontLoaded &&
       <View style = {styles.LScontainer}>

        <TouchableHighlight activeOpacity={0.5}
                underlayColor="rgba(0, 0, 0, 0)"
                style={styles.buttonContainer}
                onPress={() => this.props.navigation.navigate('Login')}>
          <Text style = {styles.buttons} >Login</Text>
        </TouchableHighlight> 
        
        <TouchableHighlight activeOpacity={0.5}
                underlayColor="rgba(0, 0, 0, 0)"
                style={styles.buttonContainer}
                onPress={() => this.props.navigation.navigate('Signup')}>
           <Text style = {styles.buttons}>Sign Up</Text>
        </TouchableHighlight>
       
       
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
},
  bigImageContainer: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 150,
    height: 150,
    marginBottom: 10
  },
  logoTitle: {
    color: 'white',
    fontSize: 32,
    fontFamily: 'OpenSans-SemiBoldItalic'

  },

  LScontainer : {
    backgroundColor: '#01579B',
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 25
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'OpenSans-SemiBoldItalic'

  },
  


});
