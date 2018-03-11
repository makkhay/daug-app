import { StackNavigator } from 'react-navigation';

import SocialStack from './SocialStack';
import CreatePost from '../screens/CreatePostScreen';


const SocialNavigator = StackNavigator({
  SocialStack: {
    screen: SocialStack
  },
  CreatePost: {
    screen: CreatePost
  },
  

}, 

{
  initialRouteName: 'SocialStack',
  mode: 'modal',
  headerMode: 'none'
});

export default SocialNavigator;