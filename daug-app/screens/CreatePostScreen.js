import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, TextInput, Platform, SafeAreaView, ImageEditor } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Header} from 'react-native-elements';

import { getUserId } from '.././util/helper';
import { onSignIn } from '../util/helper';
import COVER from '../assets/Cover.png'
import { ImagePicker } from 'expo';
import { RNS3 } from 'react-native-aws3';


export default class CreatePostScreen extends React.Component {
  constructor(props) {
    super(props);

    const { item } = props.navigation.state.params
    
    this.state = {
      isProfileLoading: true,
      profile: null,
      text: '',
      image: null,
      item,
    };
  }

  async componentDidMount() {
    this.setState({ fontLoaded: true });
   
    getUserId()
    .then(res => {
      this.setState({ userId: res })
      this.state.profile === null && this.fetchProfile()
    })
    .catch(err => {
      alert("An error occurred") 
    });

  }
  async fetchProfile() {

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
       
       

      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      console.log(error)
      Alert.alert('Unable to get your profile info', `Reason.. ${error}! ${this.state.userId}`)

    }
  }

  _renderProfileImage(image) {
    if(image) {
      return (
        <Image
        style={styles.avatar}
        source={{ uri: image }}
      />      
    )
    }
     // if image is null
     else {
      return (
        <Image 
        style={styles.avatar}
        source={COVER}
        resizeMode='cover'
        />

      )
    }
  }
  _renderProfileName(name) {
    if(name) {
      return (
        <Text style={styles.nameLabel}>{name}</Text>
      )
    }
  }





  async createPostPressed() {
    this.setState({ isLoading: true })

    const { text, image } = this.state
    const { navigate } = this.props.navigation

    var details = {
      'description': text,

    };

    if (image !== null) {
      details.image = image
    }

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/users/${this.state.userId}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      });

      let responseJSON = null

      if (response.status === 201) {
        responseJSON = await response.json();

        console.log(responseJSON)

        this.setState({ isLoading: false })
        Alert.alert(
          'Yay!',
          'You have successfully created a post!',
          [
            { text: "Continue", onPress: () => navigate("Home") }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors })
        Alert.alert('Posting failed!', `Unable to post.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      console.log(error)

      Alert.alert('Posting failed!', 'Unable to post. Please try again later')

    }

  }

  // _pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //   });

  //   if (result.cancelled) {
  //     console.log('got here');
  //     return;
  //   }

  //   let resizedUri = await new Promise((resolve, reject) => {
  //     ImageEditor.cropImage(result.uri,
  //       {
  //         offset: { x: 0, y: 0 },
  //         size: { width: result.width, height: result.height },
  //         displaySize: { width: 50, height: 50 },
  //         resizeMode: 'contain',
  //       },
  //       (uri) => resolve(uri),
  //       () => reject(),
  //     );
      

  //   });
  //   // this.setState({ image: resizedUri });

  //   const file = {
  //     // `uri` can also be a file system path (i.e. file://)
  //     uri: resizedUri,
  //     name: `user_${this.state.profile.id}_post_${new Date().getTime()}.png`,
  //     type: "image/png"
  //   }

  //   const options = {
  //     keyPrefix: "uploads/",
  //     bucket: "daug",
  //     region: "us-east-1",
  //     accessKey: "AKIAIKG2UJ7AHBKJ5N2Q",
  //     secretKey: "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",
  //     successActionStatus: 201
  //   }

  //   RNS3.put(file, options).then(response => {
  //     if (response.status !== 201)
  //       throw new Error("Failed to upload image to S3");

  //     console.log(response.body);

  //     this.setState({ image: response.body.postResponse.location });
  //   });

  // };

  




  

  render() {
    const { text,profile, isProfileLoading, image} = this.state
  

   return(
    <View style={styles.makePostContainer}>
    <SafeAreaView style={{ backgroundColor: '#FAFAFA', }}>
    <Header
      leftComponent={
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Text style={styles.navBar}>Cancel</Text>
        </TouchableOpacity>
      }
      centerComponent={{
        text: 'Create Post',
        style: {
          color: '#2F80ED', fontSize: 20,
          fontWeight: 'bold',
        }
      }}
      rightComponent={
        <TouchableOpacity onPress={() => this.createPostPressed()}>
          <Text style={styles.navBar}>Share</Text>
        </TouchableOpacity>
      }
      outerContainerStyles={{ backgroundColor: '#FAFAFA' }}
    />
  </SafeAreaView>
  { !isProfileLoading &&
    <View style={styles.mainContainer}>
     <View style={styles.createPostContainer}>
      <View style={styles.createPostHeaderContainer}>
      {this._renderProfileImage(profile["profile_image"])}
          {/* <Image source={{ uri: item.profile_image}} style={styles.avatar} /> */}
        <View style={styles.locationContainer}>
        {this._renderProfileName(profile["name"])}
          <View style={styles.locationView}>
            <Ionicons
              name='md-pin'
              size={20}
              color='#085947'
              style={{paddingRight: 1}}
            />
            <Text style={styles.locationLabel}>Add Location</Text>
          </View>
        </View>
      </View>
      <View style={styles.createPostContentContainer}>
        <TextInput
          placeholder="What's on your mind?"
          placeholderTextColor="gray"
          multiline={true}
          style={styles.postInput}
          onChangeText={(text) => this.setState({text})}
          value={text}
        />
      </View>
    </View>
    {/* {this.state.image ? */}
     <Image source={{ uri: image }} style={styles.postImage} resizeMode="cover" /> :
    <View style={styles.uploadImageContainer}>
            <TouchableOpacity onPress={this._pickImage}>
              <Ionicons
                name='md-photos'
                size={30}
                color='#085947'
                style={styles.photoPostIcon}
              />
              <Text style={styles.photoLabel}>Upload from library</Text>
            </TouchableOpacity>
          </View>
    }
  </View>
  }
 </View> 

   );
  }
}

const styles = StyleSheet.create({

  makePostContainer:{
  flex: 1
  },
  mainContainer: {
    flex: 1,
  },
  createPostContainer: {
    backgroundColor: 'white',
    borderColor: '#aaaaaa'
  },
  createPostHeaderContainer: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  createPostContentContainer: {
  },
  locationContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingLeft: 4
  },
  usernameView: {
    flex: 1,
    justifyContent: 'center'
  },
  locationView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  avatar: {
    height: 44,
    width: 44,
    borderRadius: 20,
    marginLeft: 10
  },
  nameLabel: {
    fontSize: 18,
    color: '#455C7B',
    marginLeft: 10,
    fontWeight: 'bold',

  },
  locationIcon: {
    marginLeft: 10,
    marginRight: 5
  },
  locationLabel: {
    flex: 1,
    fontSize: 13,
    color: '#44484B',

  },
  postInput: {
    height: 250,
    fontSize: 25,
    color: 'black',
    paddingLeft: 10,
    paddingTop: 10
  },

  navBar : {
    fontWeight: 'bold'
  },
  bannerImage: {
    width: '100%',
    height: 170
  },
  uploadImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoLabel: {
    color: '#737373'
  },
  photoPostIcon: {
    alignSelf: 'center',
  },
  postImage: {
    width: '100%',
    height: 250
  },
});
