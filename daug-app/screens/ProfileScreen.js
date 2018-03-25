

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Button } from 'react-native-elements'

import COVER from '../assets/Cover.png'
import {onSignOut, getUserId} from '../util/helper';



export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
        headerTintColor: '#fd746c',
        headerTitleStyle: {
          fontSize: 20
        },
        headerLeft: (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 20 }}>
           <Text style={{ fontSize: 20}}>Profile</Text>
         </View>
    
        )
      
      });
    
    
  constructor(props) {
    super(props);
    // const profile = props.navigation.state.params && props.navigation.state.params.profile
    this.state = {

      isProfileLoading: true,
      profile: null,

    };

  
    
  }
  async componentDidMount() {

    getUserId()
    .then(res => {
      this.setState({ userId: res })
      this.state.profile === null && this.fetchProfile()
    })
    .catch(err => {
      alert("An error occurred") 
    });


  }
  
  //steve@daug.com  hellosteve
  async fetchProfile() {
    const { navigate } = this.props.navigation

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/users/${this.state.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
      });

      let responseJSON = null

      if (response.status === 200) {

        responseJSON = await response.json();
        console.log(responseJSON)
        this.setState({
          isProfileLoading: false,
          profile: responseJSON,
        })
        
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ errors: responseJSON.errors })


        Alert.alert(
          'Retry Logging in...!',
         ` Your id is : ',  ${error}!  ${this.state.userId}`,
          [
            { text: "Relogin", onPress: () => onSignOut().then(() => navigate("Intro")) }
          ],
          { cancelable: false }
  
        )
        // Alert.alert('Your id is : ', ` ${error}!  ${this.state.userId}`  )
       
        
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      console.log(error)


    }
  }
  _renderProfileBanner(image) {
    // if image is not null
    if (image) {
      return (
        <Image
          style={styles.bannerImage}
          source={{ uri: image }}
        />
      )
    }
    // if image is null
    else {
      return (
        <Image 
        style={styles.bannerImage}
        source={COVER}
        resizeMode='cover'
        />

      )
    }
  }
  _renderProfileImage(image) {
    if(image) {
      return (
        <Image
        style={styles.profileImage}
        source={{ uri: image }}
      />      
    )
    }
     // if image is null
     else {
      return (
        <Image 
        style={styles.profileImage}
        source={COVER}
        resizeMode='cover'
        />

      )
    }
  }
  _renderProfileName(name) {
    if(name) {
      return (
        <Text style={styles.userName}>{name}</Text>
      )
    }
  }
  _renderProfileBio(bio) {
    if(bio) {
      return (
        <Text style={styles.userDescription}>{bio}</Text>
      )
    }
  }
  render() {
        const { navigate } = this.props.navigation
        const { profile, isProfileLoading } = this.state
     
         
        return (
    
         <ScrollView>
          { !isProfileLoading &&
           <View style={styles.container} >
             <View style ={styles.coverAndDescriptionMainContainer}>
    
               <View style = {styles.coverConatainer}>
               {this._renderProfileBanner(profile["banner_image"])}
              
            </View>
            
            <View style = {styles.userMainContainer}>
              <View style = {styles.profileAndDescriptionContainer}> 
                  <View style={styles.profileImageContainer}>
                  {this._renderProfileImage(profile["profile_image"])}
                  
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
                          onPress={() => navigate('EditProfile')}
                         >
                          <Text style={styles.toggleText}> Edit Profile </Text>
                         </TouchableOpacity>
                     </View>
                   </View>
                  </View>     
          
                 <View style = {styles.profileDetailContainer}>
                    <View style = {styles.userNameAndDescriptionContainer}>
                       {this._renderProfileName(profile["name"])}
                       {this._renderProfileBio(profile["bio"])}

                    </View>        
              </View>
            </View>
          </View>  
             <View style={styles.userFeedViewContainer}>
                <TouchableOpacity
                          style={styles.logOutButton}
                          onPress={() => onSignOut().then(() => navigate("Intro"))}
                         >
                          <Text style={styles.logOutText}> Log Out </Text>
                         </TouchableOpacity>
              </View>
           </View> 
          } 
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