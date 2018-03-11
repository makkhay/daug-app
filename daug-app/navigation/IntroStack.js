import { StackNavigator } from 'react-navigation';

import IntroScreen from '../screens/IntroScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';


import PostScreen from '../screens/PostScreen';


export default StackNavigator({
   Intro : {
       screen: IntroScreen
   },
   Login : {
    screen: LoginScreen
    
}, Signup : {
    screen: SignupScreen
},



});