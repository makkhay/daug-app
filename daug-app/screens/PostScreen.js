import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image,  ScrollView } from 'react-native';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { SOCIAL_FEED_MOCK_DATA } from '../assets/SOCIAL_FEED_MOCK_DATA';


export default class PostScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Post',
    headerTintColor: '#03A9F4',
    headerTitleStyle: {
      fontSize: 20,
    },
  });

  constructor(props) {
    super(props);
    // const { post } = props.navigation.state.params
    const post = props.navigation.state.params && props.navigation.state.params.post

    this.state = {
      item: post,
      commented: false,
      liked: false,
      post: post || SOCIAL_FEED_MOCK_DATA[0].post,
    };
  }

  
  displayComment(comment, index) {

    return (
      <View style={styles.commentContainer} key={index}>
          <Image source={{ uri: comment.user.image }} style={styles.commentAvatar} />
        <View style={styles.postUserNameLocationContainer}>
          <TouchableOpacity style={styles.postUsernameView}>
            <Text style={styles.commentUsernameLabel}>{comment.user.name}</Text>
          </TouchableOpacity>
          <View style={styles.postLocationView}>
            <Text style={styles.commentContentLabel}>{comment.content}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderComments() {
    const { comments } = this.state.item

    return (
      <View style={styles.commentsContainer}>
        {
          comments.map((comment, index) => {
            return this.displayComment(comment, index)
          })
        }
      </View>
    )
  }

  render() {
    const { navigate } = this.props.navigation
    const { post, commented, item,liked } = this.state


    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.postContainer} key={item}>
          <View style={styles.postHeaderContainer}>
              <Image source={{ uri: item.user.profile_image}} style={styles.avatar} />
            <View style={styles.postUsernameLocationContainer}>
              <TouchableOpacity
                style={[styles.postUsernameView, post.location && { marginTop: 10 }]}
                onPress={() => navigate('FriendProfile', { user: item.user })}
              >
                <Text style={styles.nameLabel}>{item.user.name}</Text>
              </TouchableOpacity>
                <View style={styles.postLocationView}>
                  <Text style={styles.locationLabel}>SF</Text>
                </View>
            </View>
          </View>
          <View>
            <View style={styles.postContentContainer}>
              <Image source={{ uri: item.image }} style={styles.postImage} resizeMode="cover" />
              <Text style={styles.postCaption}>{item.description}</Text>
            </View>
          </View>
          <View style={styles.postBottomContainer}>
            <View style={styles.postDateView}>
              <Text style={styles.postDateText}>{item.date}</Text>
            </View>
            <TouchableOpacity
              onPress={() => { this.setState({ liked: !liked }); }} >
             <View style={[styles.postView, { marginRight: 15 }]}>
              <Ionicons
                  name={liked ? "ios-heart" : "ios-heart-outline"}
                  color={liked ? 'red' : 'black'} size={25}
                />
               <Text style={styles.postButtonText}>{item.likes}</Text>
             </View>
           </TouchableOpacity> 
          </View>
        </View>
        <Text style={styles.sectionHeaderText}>{item.comments ? item.comments.length : 'NO'} COMMENTS</Text>
        {item.comments && this.renderComments()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  postContainer: {
    backgroundColor: 'white',
    borderColor: '#aaaaaa'
  },
  postHeaderContainer: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#aaaaaa',
  },
  commentContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#aaaaaa',
  },
  postUserNameLocationContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  postUsernameView: {
    flex: 1,
    justifyContent: 'center'
  },
  postLocationView: {
    flex: 1,
    justifyContent: 'center'
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 10
  },
  commentAvatar: {
    height: 25,
    width: 25,
    borderRadius: 12,
    marginLeft: 10
  },
  nameLabel: {
    fontSize: 18,
    color: '#455C7B',
    marginLeft: 10,
    fontWeight: 'bold',

  },
  commentUsernameLabel: {
    fontSize: 14,
    color: '#44484B',
    marginLeft: 10,

  },
  commentContentLabel: {
    flex: 1,
    fontSize: 12,
    color: '#656A73',
    marginLeft: 10,

  },
  locationLabel: {
    flex: 1,
    fontSize: 15,
    color: '#44484B',
    marginLeft: 10,

  },
  postContentContainer: {
    backgroundColor: '#f9f9f9'
  },
  postImage: {
    width: '100%',
    height: 250
  },
  postCaption: {
    margin: 10,
    color: '#44484B',
    fontSize: 15,

  },
  postBottomContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  postDateView: {
    flex: 3,
    justifyContent: 'center'
  },
  postDateText: {
    marginLeft: 20,
    color: '#44484B',
    fontSize: 11,

  },
  postView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  postButtonText: {
    marginLeft: 8,
    color: '#44484B',
    fontSize: 14,

  },
  sectionHeaderText: {
    fontSize: 12,
    color: '#aaaaaa',
    marginVertical: 10,
    marginLeft: 10
  },
  commentsContainer: {
    backgroundColor: 'white'
  }
});