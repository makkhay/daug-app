

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Alert ,Dimensions , ActivityIndicator, DeviceEventEmitter} from 'react-native';
import { Button } from 'react-native-elements'
import { Font } from 'expo';

import COVER from '../assets/Cover.png'
import {onSignOut, getUserId} from '../util/helper';
const DEVICE_WIDTH = Dimensions.get('window').width;



export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerVisible: navigation.state.params ? navigation.state.params.isHeaderShow : false,
      title: 'Profile',
      headerTintColor: '#03A9F4',
      headerTitleStyle: {
        fontSize: 20,

      }
    }
  }
  constructor(props) {
    super(props);
    // const profile = props.navigation.state.params && props.navigation.state.params.profile
    const userId = props.navigation.state.params && props.navigation.state.params.userId
    const isHeaderShow = props.navigation.state.params && props.navigation.state.params.isHeaderShow
    this.state = {

      isProfileLoading: true,
      profile: null,
      userId: userId || null,
      isHeaderShow: isHeaderShow || false,
      fontLoaded: false,
      followPressed: true,

    };

  
    
  }
  async componentDidMount() {
    await Font.loadAsync({
      'OpenSans-SemiBoldItalic': require('../assets/fonts/OpenSans-SemiBoldItalic.ttf')
    });
    this.setState({ fontLoaded: true });

    const { userId } = this.state

    if (userId === null) {
      getUserId()
        .then(res => {
          this.setState({ userId: res })
          this.state.profile === null && this.fetchProfile()
        })
        .catch(err => {
          alert("An error occurred")
        });
    } else {
      this.fetchProfile()

      getUserId()
      .then(res => {
        this.setState({ post_detail_home_user_id: res })
      })
      .catch(err => {
        alert("An error occurred")
      });
  }

  }

  componentWillMount() {
    DeviceEventEmitter.addListener('user_profile_updated', (e) => {
      this.fetchProfile()
    })
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

  async followUser() {
    const { post_detail_home_user_id, userId } = this.state

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/users/${post_detail_home_user_id}/follow/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: null
      });

      let responseJSON = null

      if (response.status === 201) {
        responseJSON = response.json();

        console.log(responseJSON)

        this.fetchProfile()
        this.setState({ following: true })
        this.setState({  followPressed: false })
       
        Alert.alert(
          'Following user!',
          '',
          [
            {
              text: "Dismiss", onPress: () => {
                console.log("User followed!")
              }
            }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors, following: false })

        Alert.alert('Unable to follow user', `${error}`)
        this.setState({  followPressed: false })
      }
    } catch (error) {
      this.setState({ isLoading: false, error, following: false })

      Alert.alert('Unable to follow user', `${error}`)
      this.setState({  followPressed: false })
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

  loadingView() {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    )
  }




  displayPost(post, index) {
    const { navigate } = this.props.navigation

    return (
      <TouchableOpacity
        style={[styles.postIconContainer, { width: DEVICE_WIDTH / 3, height: DEVICE_WIDTH / 3 }]}
        key={index}
        onPress={() => navigate('Post', { postId: post.id })}
        activeOpacity={1}
      >
        {post.image && <Image source={{ uri: post.image || '' }} style={styles.postImage} resizeMode="cover" />}
      </TouchableOpacity>
    )
  }

  renderPosts() {
    const { posts } = this.state.profile

    return (
      <View style={styles.postsContainer}>
        {
          posts.map((post, index) => {
            return this.displayPost(post, index)
          })
        }
      </View>
    )
  }


  followPressed(){

  }



  contentView() {
        const { navigate } = this.props.navigation
        const { profile, isProfileLoading, isHeaderShow,followPressed } = this.state
     
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
                          <Text style={styles.statsLabel}>{profile.posts ? profile.posts.length : '0'}</Text>
                          <Text style={styles.statsLabel}>Posts</Text>
                        </View>
                        <View style={styles.profileStat}>
                          <Text style={styles.statsLabel}>{profile.followers && profile.followers.length || 0}</Text>
                          <Text style={styles.statsLabel}>Followers</Text>
                        </View>
                        <TouchableOpacity 
                          style = {styles.profileStat}
                          onPress={() => navigate('Follower' , {user: profile.user})}
                        >
                        <View style={styles.profileStat}>
                          <Text style={styles.statsLabel}>{profile.following && profile.following.length || 0}</Text>
                          <Text style={styles.statsLabel}>Following</Text>
                
                        </View> 
                        </TouchableOpacity>
                     </View>
                     <View style = {styles.editButtonContainer}>
                     { 
                    !isHeaderShow ?
                        <TouchableOpacity
                          style={styles.toggleButton}
                          onPress={() => navigate('EditProfile')}
                         >
                          <Text style={styles.toggleText}> Edit Profile </Text>
                         </TouchableOpacity> :

                        <TouchableOpacity
                         onPress={() => this.followUser() }
                         style={[styles.toggleButton, followPressed ==true ? { backgroundColor: 'white'}: { backgroundColor: '#28ABEC'} ]} 
                         
                        >
                        { followPressed ?
                         <Text style={[styles.toggleText] }> Follow </Text>
                         :

                        <Text style={[styles.toggleText1] }> Followed </Text>
                        }
                    
                        </TouchableOpacity>
                        



                     }
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
             { !isHeaderShow ?
                      
             <View style={styles.userFeedViewContainer}>
             {this.renderPosts()}
             <View style = {styles.logOutContainer}>
                <TouchableOpacity
                          style={styles.logOutButton}
                          onPress={() => onSignOut().then(() => navigate("Intro"))}
                         >
                          <Text style={styles.logOutText}> Log Out </Text>
                         </TouchableOpacity>
                </View>         
                         
              </View> :
              this.renderPosts()
            }

              
              
           </View> 
          
           
          } 
        </ScrollView>
        )
      }


      render() {
        const { navigate } = this.props.navigation
        const { profile, isHeaderShow, fontLoaded, isProfileLoading } = this.state
    
        return (
          this.state.fontLoaded && ( isProfileLoading || profile === null ? this.loadingView() : this.contentView() )
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

        // alignItems: 'center'
        
      },

      logOutContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },


      logOutButton : {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#28ABEC'
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
      
      toggleText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'black',
      },
      toggleText1: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
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
    
       },
       postIconContainer: {
        borderWidth: 1,
        borderColor: '#aaaaaa',
        backgroundColor: '#f9f9f9'
      },
      postImage: {
        flex: 1
      },
      postsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 10,
        paddingBottom: 20
      },
    
    });