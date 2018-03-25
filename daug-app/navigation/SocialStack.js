import { StackNavigator } from 'react-navigation';

import SocialFeedScreen from '../screens/SocialFeedScreen';
import PostScreen from '../screens/PostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreatePost from '../screens/CreatePostScreen'
import FriendProfile from '../screens/FriendProfile';

const SocialStack = StackNavigator({
  Social: {
    screen: SocialFeedScreen
  },
  Post: {
    screen: PostScreen
  },
  Profile: {
    screen: ProfileScreen
  },
  FriendProfile : {
    screen: FriendProfile
  },


});

export default SocialStack;