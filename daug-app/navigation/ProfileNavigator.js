import { StackNavigator } from 'react-navigation';

import ProfileStack from './ProfileStack';
import EditProfileScreen from '../screens/EditProfileScreen';

const ProfileNavigator = StackNavigator({
  ProfileStack: {
    screen: ProfileStack
  },
  EditProfile: {
    screen: EditProfileScreen
  }
}, {
  initialRouteName: 'ProfileStack',
  mode: 'modal',
  headerMode: 'none'
});

export default ProfileNavigator;