import React from 'react';
import { StyleSheet, Text, View , ScrollView, Image, TouchableOpacity} from 'react-native';


import COVER from '../assets/Cover.png'
import { Font } from 'expo';
import IntroScreen from '../screens/IntroScreen';
import { SOCIAL_FEED_MOCK_DATA } from '../assets/SOCIAL_FEED_MOCK_DATA';


export default class FriendProfile extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: "Profile",
    headerTintColor: '#03A9F4',
    headerTitleStyle: {
      fontSize: 20
    },
   
  
  });


  constructor(props){
    super(props);

    const user = props.navigation.state.params && props.navigation.state.params.user
  
    state = {
      fontLoaded: false,
    };
    this.state = { 
      fontLoaded: false,
      user: user || SOCIAL_FEED_MOCK_DATA[0].user,
     
     };
  
  }
 
  async componentDidMount() {
    await Font.loadAsync({
      'OpenSans-SemiBoldItalic': require('../assets/fonts/OpenSans-SemiBoldItalic.ttf')
    });
    this.setState({ fontLoaded: true });
  }




  render() {
    const { user } = this.state

    const { navigate } = this.props.navigation

    return (

     <ScrollView>
     
       <View style={styles.container} >
       
         <View style ={styles.coverAndDescriptionMainContainer}>
           <View style = {styles.coverConatainer}>
             <Image 
              style={styles.bannerImage}
              source={COVER}
              resizeMode='cover'
              />
        </View>
        
        <View style = {styles.userMainContainer}>
          <View style = {styles.profileAndDescriptionContainer}> 
              <View style={styles.profileImageContainer}>
             
                 <Image
                    style={styles.profileImage}
                    source={{uri: user.profile_image}}
                    resizeMode='cover'
                   />
                 
               </View>

               <View style = {styles.profileDetailStatsContainer}>
                 <View style = {styles.fullStatsContainer}>
                    <View style={styles.profileStat}>
                      <Text style={styles.statsLabel}>{user.posts ? user.posts.length : '0'}</Text>
                      <Text style={styles.statsLabel}>Posts</Text>
                    </View>
                    <View style={styles.profileStat}>
                      <Text style={styles.statsLabel}>345</Text>
                      <Text style={styles.statsLabel}>Followers</Text>
                    </View>
                    <View style={styles.profileStat}>
                      <Text style={styles.statsLabel}>23</Text>
                      <Text style={styles.statsLabel}>Following</Text>
                    </View>

                 
                 </View>

                   {this.state.fontLoaded &&
                 <View style = {styles.editButtonContainer}>
                    <TouchableOpacity
                      style={styles.followButton}
                     >
                      <Text style={styles.toggleText}> Follow </Text>
                     </TouchableOpacity>

                 </View>
                  }
               </View>

           </View>     
         

    
             <View style = {styles.profileDetailContainer}>
             
                <View style = {styles.userNameAndDescriptionContainer}>
                   <Text style = {styles.userName}> {user.name} </Text>
                  
                   <Text style = {styles.userDescription}>{user.bio} </Text>
                </View> 
                 
                
             
          </View>
             
             

        </View>
             
      </View>  
       
       
       </View>  
       
       
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection : 'column',
  
  },
  coverAndDescriptionMainContainer: {
     flex: 1,
     backgroundColor: '#f9f9f9'

  },
  userFeedViewContainer: {
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',

   
  },

  coverConatainer: {
    height: 170,

  },
  bannerImage: {
    width: '100%',
    height: 170
  },
  userMainContainer : {
    height:190,
    flexDirection: 'column',
 },
  
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#aaaaaa',
    marginTop: -25
  },
  profileDetailContainer: {

    
  },
  userNameAndDescriptionContainer: {
    padding: 10,

    
  },
  userName : {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },
  profileAndDescriptionContainer: {
    flexDirection: 'row',
    flex: 2
  },
  profileImageContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20
  },
  profileDetailStatsContainer : {
    flex: 3,    
    flexDirection: 'column'
  },
  fullStatsContainer : {
   flex: 3,
   flexDirection: 'row'
  },
  editButtonContainer : {
    flex: 1,
    width: 150,
    height: 30,
    marginLeft: 65,

  },
  editProfileText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold'
  },
  followButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 175,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#28ABEC'
  },
  
  toggleText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    fontFamily :'OpenSans-SemiBoldItalic'
  },

  logOutText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
  profileStat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  statsLabel: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'normal',
    fontWeight: 'bold'
  },
   userDescription : {

   }

});
