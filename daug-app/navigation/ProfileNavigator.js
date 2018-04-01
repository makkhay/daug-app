import { StackNavigator } from 'react-navigation';

import ProfileStack from './ProfileStack';
import EditProfileScreen from '../screens/EditProfileScreen';
import FollowerList from '../screens/FollowerList';


const ProfileNavigator = StackNavigator({
  ProfileStack: {
    screen: ProfileStack
  },
  EditProfile: {
    screen: EditProfileScreen
  },
  Follower : {
    screen : FollowerList
  },
}, {
  initialRouteName: 'ProfileStack',
  mode: 'modal',
  headerMode: 'none'
});

export default ProfileNavigator;