import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, TextInput, Platform, SafeAreaView , DeviceEventEmitter, ImageEditor} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Header} from 'react-native-elements';
import {getUserId} from '../util/helper';
import { ImagePicker } from 'expo';


export default class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      name: '',
      bio: '',
      profile: null,
      isProfileLoading: true,
      image: null,
      
    }
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

        Alert.alert('Your id is : ', ` ${error}!  ${this.state.userId}`  )
       
        
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      console.log(error)


    }
  }

  _renderProfileEmail(name) {
    if(name) {
      return (
        <Text style={styles.inputLabel}>{name}</Text>
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

  


  async submitProfile() {
    this.setState({ isLoading: true })

    const { name, bio, image } = this.state

    var details = {
      'name': name,
      'bio': bio,
      'image': image

    };

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/users/${this.state.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      });

      let responseJSON = null

      if (response.status === 200) {
        responseJSON = await response.json();

        console.log(responseJSON)

        this.setState({ isLoading: false })

        Alert.alert(
          'Profile updated!',
          '',
          [
            { text: "Dismiss", onPress: () => {
              DeviceEventEmitter.emit('user_profile_updated', {})
              this.props.navigation.goBack()
            }}
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors })

        Alert.alert('Unable to update profile!', `${error}`)
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      Alert.alert('Unable to update profile!', `${error}`)
    }
  }


  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.cancelled) {
      console.log('got here');
      return;
    }

    let resizedUri = await new Promise((resolve, reject) => {
      ImageEditor.cropImage(result.uri,
        {
          offset: { x: 0, y: 0 },
          size: { width: result.width, height: result.height },
          displaySize: { width: 50, height: 50 },
          resizeMode: 'contain',
        },
        (uri) => resolve(uri),
        () => reject(),
      );
    });

    this.setState({ image: resizedUri });
  };



  _showAlert(){
    Alert.alert(
      'Alert!',
      `You can't edit your email `,
      [
        { text: "OK"}
      ],
      { cancelable: false }
    )
  }

  render() {
    const { name,bio, profile, isProfileLoading } = this.state


   return(
     
    <View style={styles.mainContainer}>
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
        <TouchableOpacity  
        onPress={this.submitProfile.bind(this)}>
          <Text style={styles.navBar}>Save</Text>
        </TouchableOpacity>
      }
      outerContainerStyles={{ backgroundColor: '#FAFAFA' }}
    />
  </SafeAreaView>

       { !isProfileLoading &&
       <View style={styles.photoContainer}>
           
               {this._renderProfileImage(profile["profile_image"])}

            <TouchableOpacity   onPress={this._pickImage}>
              <Text style={styles.changePhotoLabel}>Change Photo</Text>
            </TouchableOpacity>
          </View>
       }
          
          <View style={styles.detailsContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                value={name}
                onChangeText={name => this.setState({ name })}
                placeholder="Type here to edit"
                placeholderTextColor="#aaaaaa"
                autoCapitalize="words"
                style={styles.inputStyle}
                containerStyle={{ width: '100%', borderColor: '#aaaaaa' }}
              />
            </View>
            <View style={[styles.inputContainer, { marginBottom: 10 }]}>
              <Text style={styles.inputLabel}>Bio</Text>
              <TextInput
                value={bio}
                onChangeText={bio => this.setState({ bio })}
                placeholder="Type here to edit"
                placeholderTextColor="#aaaaaa"
                autoCapitalize="sentences"
                style={styles.inputStyle}
                containerStyle={{ width: '100%', borderColor: '#aaaaaa' }}
              />
            </View>
          </View>
          <Text style={styles.sectionHeaderText}>PRIVATE INFORMATION</Text>
         
          <TouchableOpacity onPress={this._showAlert}>
          <View style={styles.privateDetailsContainer}>
          { !isProfileLoading &&
            <View style={[styles.inputContainer, { marginVertical: 10 }]}>
              <Text style={styles.inputLabel}>Email</Text>
              {this._renderProfileEmail(profile["email"])}
            </View>
          }
          </View>
          </TouchableOpacity>
       
    </View>
       
   );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  photoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white'
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: '#aaaaaa'
  },
  changePhotoLabel: {
    fontSize: 16,
    color: '#28ABEC',
    marginTop: 10,
    textAlign: 'center'
  },
  detailsContainer: {
    marginBottom: 20,
    backgroundColor: 'white'
  },
  inputContainer: {
    height: 80,
    justifyContent: 'center',
    marginHorizontal: 20
  },
  inputLabel: {
    fontSize: 16,
    color: 'black',
  },
  inputStyle: {
    width: '100%',
    borderColor: '#aaaaaa',
    fontSize: 14,
    color: 'black',
  },
  sectionHeaderText: {
    fontSize: 13,
    color: '#aaaaaa',
    marginHorizontal: 20
  },
  privateDetailsContainer: {
    marginVertical: 10,
    backgroundColor: 'white'
  },
   navBar: {
  fontWeight : 'bold'
  }
  
});
