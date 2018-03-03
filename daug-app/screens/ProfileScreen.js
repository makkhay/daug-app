import React from 'react';
import { StyleSheet, Text, View , ScrollView, Image, TouchableOpacity} from 'react-native';

import COVER from '../assets/Cover.png'
import PROFILE from '../assets/Profile.png'
import { Font } from 'expo';
import IntroScreen from '../screens/IntroScreen';


export default class ProfileScreen extends React.Component {

  constructor(props){
    super(props);
   
    state = {
      fontLoaded: false,
    };
    this.state = { screen: null  };
  
  }
  logOutPressed =()=> {
    this.setState({ screen: 'IntroScreen' })
  }


  async componentDidMount() {
    await Font.loadAsync({
      'OpenSans-SemiBoldItalic': require('../assets/fonts/OpenSans-SemiBoldItalic.ttf')
    });
    this.setState({ fontLoaded: true });
  }
  render() {
    const { screen } = this.state

    if (screen === 'IntroScreen') {
      return <IntroScreen />;
    }

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
                    source={PROFILE}
                    resizeMode='cover'
                   />
                 
               </View>

               <View style = {styles.profileDetailStatsContainer}>
                 <View style = {styles.fullStatsContainer}>
                    <View style={styles.profileStat}>
                      <Text style={styles.statsLabel}>0</Text>
                      <Text style={styles.statsLabel}>Posts</Text>
                    </View>
                    <View style={styles.profileStat}>
                      <Text style={styles.statsLabel}>127896</Text>
                      <Text style={styles.statsLabel}>Followers</Text>
                    </View>
                    <View style={styles.profileStat}>
                      <Text style={styles.statsLabel}>1</Text>
                      <Text style={styles.statsLabel}>Following</Text>
                    </View>

                 
                 </View>

                 <View style = {styles.editButtonContainer}>
                    <TouchableOpacity
                      style={styles.toggleButton}
                      onPress={this.handleClick}
                     >
                      <Text style={styles.toggleText}> Edit Profile </Text>
                     </TouchableOpacity>

                 </View>

               </View>

           </View>     
         

    
             <View style = {styles.profileDetailContainer}>
             
                <View style = {styles.userNameAndDescriptionContainer}>
                   <Text style = {styles.userName}> Charlier </Text>
                  
                   <Text style = {styles.userDescription}> Best dog lover </Text>
                </View> 
                 
                
             
          </View>
             
             

        </View>
             
      </View>  
       

         <View style={styles.userFeedViewContainer}>
            <TouchableOpacity
                      style={styles.logOutButton}
                      onPress={this.logOutPressed}
                     >
                      <Text style={styles.logOutText}> Log Out </Text>
                     </TouchableOpacity>
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
    fontSize: 18
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
    fontSize: 13
  },
  toggleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
    marginBottom: 4,
    borderWidth: 1,
    borderRadius: 5,
  },
  logOutButton : {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#28ABEC'
  },
  toggleText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
  },

  logOutText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
  profileStat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  statsLabel: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'normal'
  },
   userDescription : {

   }

});
