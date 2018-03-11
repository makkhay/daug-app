import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, TextInput, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class CreatePostScreen extends React.Component {
  constructor(props) {
    super(props);

    const { item } = props.navigation.state.params

    this.state = {
      item,
    };
  }

  
  
  static navigationOptions = ({ navigation }) => ({
    title: 'Create Post',
    headerTintColor: '#03A9F4',
    headerTitleStyle: {
      fontSize: 20,
      justifyContent: 'center',
      alignItems: Platform.OS === 'android' ? 'center' : 'center',
    },

    headerRight: (
      <TouchableOpacity  onPress={() => {
        Alert.alert(
          'Success!',
          `The post has been created with:`,
          [
            { text: "OK", onPress: () => navigation.navigate('SocialStack') }
          ],
          { cancelable: false }
        )
      }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 20 , fontWeight: 'bold'}}>Share</Text>
        </View>
      </TouchableOpacity>
    ),

    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('SocialStack')}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Cancel</Text>
        </View>
      </TouchableOpacity>
    )
  });


  render() {
    const { item} = this.state
   return(
    <View style={styles.mainContainer}>
     <View style={styles.createPostContainer}>
      <View style={styles.createPostHeaderContainer}>
          <Image source={{ uri: item.user.image }} style={styles.avatar} />
        <View style={styles.locationContainer}>
            <Text style={styles.nameLabel}>{item.user.name}</Text>
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
  }
});
