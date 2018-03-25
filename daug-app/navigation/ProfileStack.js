import { StackNavigator } from 'react-navigation';

import ProfileScreen from '../screens/ProfileScreen';
import PostScreen from '../screens/PostScreen';
import EditProfileScreen from '../screens/EditProfileScreen';



const ProfileStack = StackNavigator({
  Profile: {
    screen: ProfileScreen
  },
  Post: {
    screen: PostScreen
  },

  // EditProfile: {
  //   screen: EditProfileScreen
  // }, 
  

});

export default ProfileStack;