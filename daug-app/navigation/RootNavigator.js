import { StackNavigator } from 'react-navigation';



import HomeTabs from './HomeTabs'
import IntroStack from './IntroStack';



const RootNavigator = StackNavigator({
   // this is the deault one ??
    Intro : {
       screen: IntroStack
   },
   Home : {
    screen: HomeTabs
  } 
}, {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none'
  });

  export default RootNavigator;