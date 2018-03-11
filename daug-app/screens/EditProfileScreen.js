import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, TextInput, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      name: 'Charlier',
      bio: "Best Dog lover",
      email: 'dog@gmail.com'
    }
  }  
  static navigationOptions = ({ navigation }) => ({

 
    title: 'Edit Profile',
    headerTintColor: '#03A9F4',
    headerTitleStyle: {
      fontSize: 20,
      padding: 8,
      justifyContent: 'center',   
      alignItems: Platform.OS === 'android' ? 'center' : 'center',


    
    },

    headerRight: (
      <TouchableOpacity  onPress={() => {
        Alert.alert(
          'Success!',
          `Your Profile has edited`,
          [
            { text: "OK", onPress: () => navigation.navigate('Profile') }
          ],
          { cancelable: false }
        )
      }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
          <Text style={{ fontSize: 15 , fontWeight: 'bold'}}>Save</Text>
        </View>
      </TouchableOpacity>
    ),

    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{ fontSize: 15, fontWeight: 'bold'}}>Cancel</Text>
        </View>
      </TouchableOpacity>
    )
  });


  render() {
    const { name,bio, email} = this.state
   return(
    <View style={styles.mainContainer}>
       <View style={styles.photoContainer}>
            <Image
              style={styles.profileImage}
              source={{ uri: 'https://thumbs.dreamstime.com/b/dalmatian-puppy-portrait-10524552.jpg' }}
              resizeMode='cover'
            />
            <TouchableOpacity>
              <Text style={styles.changePhotoLabel}>Change Photo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                value={name}
                onChangeText={name => this.setState({ name })}
                placeholder="Name"
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
                placeholder="Bio"
                placeholderTextColor="#aaaaaa"
                autoCapitalize="sentences"
                style={styles.inputStyle}
                containerStyle={{ width: '100%', borderColor: '#aaaaaa' }}
              />
            </View>
          </View>
          <Text style={styles.sectionHeaderText}>PRIVATE INFORMATION</Text>
          <View style={styles.privateDetailsContainer}>
            <View style={[styles.inputContainer, { marginVertical: 10 }]}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                value={email}
                onChangeText={email => this.setState({ email})}
                placeholder="Email"
                placeholderTextColor="#aaaaaa"
                autoCapitalize="none"
                style={styles.inputStyle}
                containerStyle={{ width: '100%', borderColor: '#aaaaaa' }}
              />
            </View>
          </View>

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
    color: '#aaaaaa',
  },
  inputStyle: {
    width: '100%',
    borderColor: '#aaaaaa',
    fontSize: 18,
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
  }
  
});
