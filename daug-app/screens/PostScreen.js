import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { ENV_URL, getUserId, timeSince } from '../util/helper';
import { Ionicons } from '@expo/vector-icons';



export default class PostScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Post',
    headerTintColor: '#2F80ED',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    }
  });
  constructor(props) {
    super(props);
    const postId = props.navigation.state.params && props.navigation.state.params.postId

    this.state = {
      postId: postId || null,
      member: null,
      liked: false,
      comment: null,
    };
  }
  async componentWillMount() {

    const { postId } = this.state

    if (postId === null) {
      Alert.alert(
        'Unable to display Post! Please try again',
      
        [
          {
            text: "OK", onPress: () => {
              this.props.navigation.goBack()
            }
          }
        ],
        { cancelable: false }
      )
    } else {
      this.fetchPost()
    }

    getUserId()
      .then(res => {
        this.setState({ userId: res })
        this.fetchUser()
      })
      .catch(err => {
        alert("An error occurred")
      });

    this.setState({ fontLoaded: true });
  }

  async fetchPost() {
    this.setState({ isLoading: true });
    const { postId } = this.state

    try {
      const response = await fetch(`https://daug-app.herokuapp.com/api/posts/${postId}`, {
        method: 'GET'
      });
      const responseJSON = await response.json();

      if (response.status === 200) {
        console.log(responseJSON);

        this.setState({ member: responseJSON, isLoading: false })
      } else {
        const error = responseJSON.message

        console.log("failed: " + error);
      }
    } catch (error) {
      console.log("failed: " + error);
    }
  }
  async fetchUser() {
    this.setState({ isLoading: true });

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/users/${this.state.userId}`, {
        method: 'GET'
      });

      let responseJSON = null

      if (response.status === 200) {
        responseJSON = await response.json();

        console.log(responseJSON);

        this.setState({ user: responseJSON, isLoading: false })
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log("failed: " + error);
      }
    } catch (error) {
      console.log("failed: " + error);
    }
  }

  displayComment(comment, index) {
    return (
      <View style={styles.commentContainer} key={index}>
        <TouchableOpacity>
          {this._renderCommentAvatar(comment.user["profile_image"])}
        </TouchableOpacity>
        <View style={styles.postUsernameLocationContainer}>
          <TouchableOpacity style={styles.postUsernameView}>
            <Text style={styles.commentUsernameLabel}>{comment.user.name}</Text>
          </TouchableOpacity>
          <View style={styles.commentLocationContainer}>
            <Text style={styles.commentContentLabel}>{comment.description}</Text>
          </View>
        </View>
      </View>
    )
  }

  // This function will render the comments and load the contents
  renderComments() {
    const { comments } = this.state.member

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
  //Helps with post new comments
  // Using post request to server 
  async postComment() {
    const { comment, postId, user } = this.state

    var details = {
      'comment': comment
    };

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/posts/${postId}/comment/${user.id}`, {
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

        this.fetchPost()
        this.setState({ comment: null })

        Alert.alert(
          'Comment added!',
          '',
          [
            {
              text: "Dismiss", onPress: () => {
                console.log("comment added!")
              }
            }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors, comment: null })

        Alert.alert('Unable to add new comment!', `${error}`)
      }
    } catch (error) {
      this.setState({ isLoading: false, error, comment: null })

      Alert.alert('Unable to add new comment!', `${error}`)
    }
  }

  //Rendering add comment
  renderAddComment() {
    const { comment } = this.state

    return (
      <View style={styles.commentsContainer}>
        <View style={styles.commentContainer}>
          <Icon
            name='comments-o'
            color='#666666'
            type="font-awesome"
            size={25}
            containerStyle={{ marginHorizontal: 10 }}
          />
          <Input containerStyle={{ width: '100%' }}
            value={comment}
            onChangeText={comment => this.setState({ comment })}
            placeholder="Enter a comment"
            placeholderTextColor="gray"
            inputStyle={{ color: 'black', fontSize: 14 }}
            onSubmitEditing={() => {
              this.postComment()
            }}
          />
        </View>
      </View>
    )
  }
  //Helps to create a new like if button is like buton is pressed
  // Uses post request 
  async postLike() {
    const { postId, user } = this.state
    
      try {
        let response = await fetch(`https://daug-app.herokuapp.com/api/posts/${postId}/like/${user.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: null
        });
  
        let responseJSON = null
  
        if (response.status === 201) {
          responseJSON = await response.json();
  
          console.log(responseJSON)
  
          this.fetchPost()
          this.setState({ liked: true })
  
          Alert.alert(
            'You liked this post!',
            '',
            [
              {
                text: "Dismiss", onPress: () => {
                  console.log("liked!")
                }
              }
            ],
            { cancelable: false }
          )
        } else {
          responseJSON = await response.json();
          const error = responseJSON.message
  
          console.log(responseJSON)
  
          this.setState({ isLoading: false, errors: responseJSON.errors, comment: null })
  
          Alert.alert('Unable to like post! ', `${error}`)
        }
      } catch (error) {
        this.setState({ isLoading: false, error, comment: null })
  
        Alert.alert(' Unable to like post! ', `${error}`)
      }    
  }
  // Helps with unliking the comment
  // Uses post request 
  async postUnLike(){
    const { postId, user } = this.state

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/posts/${postId}/unlike/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: null
      });

      let responseJSON = null

      if (response.status === 200) {
        responseJSON = await response.json();

        console.log(responseJSON)

        this.fetchPost()
        this.setState({ liked: false })

        Alert.alert(
          'You unliked this post!',
          '',
          [
            {
              text: "Dismiss", onPress: () => {


              }
            }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors, comment: null })

        Alert.alert(' Unable to unlike post! ', `${error}`)
      }
    } catch (error) {
      this.setState({ isLoading: false, error, comment: null })

      Alert.alert(' Unable to unlike post! ', `${error}`)
    }
  }
  //Shows screen loading and other tasks being done in background
  loadingView() {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  _renderProfileImage(image) {
    if (image) {
      return (
        <Image source={{ uri: image }} style={styles.avatar} />
      )
    }
    else {
      return (
        <View
          style={styles.defaultProfileAvatar}
        >
        </View>
      )
    }
  }
  _renderPostImage(image) {
    if (image) {
      return (
        <Image
          source = {{uri: image}} 
          style = {{
             width: "100%",
             height: 400,
          }}
       />
      )
    }
  }
  _renderCommentAvatar(image) {
    if (image) {
      return (
        <Image style={styles.commentAvatar} source={{ uri: image }} />
      )
    }
    else {
      return (
        <View
          style={styles.defaultCommentAvatar}
        >
        </View>
      )
    }
  }

  postContent() {
    const { member, liked } = this.state
    const { navigate} = this.props.navigation
    const Component = member && member.comments ? KeyboardAwareScrollView : KeyboardAvoidingView
    return (
      <Component
        style={styles.mainContainer}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}>
        <View style={styles.membersRowContainer} key={member}>
          <View style={styles.postInfoTopContainer}>
            <View style={styles.postAuthorAvatarContainer}>
              <TouchableOpacity>
                {member && member.user && this._renderProfileImage(member.user["profile_image"])}
              </TouchableOpacity>
            </View>
            <View style={styles.postAuthorInfoContainer}>
              <View style={styles.nameContainer}>
                <TouchableOpacity  onPress={() => navigate('Profile',{ isHeaderShow: true, userId: member.user.id })}>
                  <Text style={styles.nameLabel}>{member && member.user && member.user.name}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.locationContainer}>
                <TouchableOpacity>
                  <Text style={styles.locationLabel}>{member && member.location}</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
          <View style={styles.postContainer}>
            <View style={styles.postImageContainer}>
              {this._renderPostImage(member["image"])}

            </View>
            <View style={styles.postCaptionContainer}>
              <Text style={styles.postCaption}> {member && member.description}</Text>
            </View>
          </View>
          <View style={styles.postInfoBottomContainer}>
            <View style={styles.postDataContainer}>
              <Text style={styles.postDate}>{ timeSince(member && member.createdAt)}</Text>
            </View>
            <View style={[styles.postLikeContainer, { marginRight: 20 }]}>
              <TouchableOpacity onPress={() => liked === false ? this.postLike() : this.postUnLike()}>
              {/* <TouchableOpacity onPress={() =>  this.postLike()}> */}
              <Ionicons
             name={liked ? "ios-heart" : "ios-heart-outline"}
             color={liked ? 'red' : 'black'} size={30}/>
              </TouchableOpacity>
              <Text style={styles.postActionText}>{member.likes.length}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.sectionLabel}>{member.comments ? member.comments.length : 'NO'} Comment{member.comments.length !== 1 ? 's' : ''}</Text>
        {member.comments && this.renderComments()}
        {this.renderAddComment()}
      </Component>
    )
  }
  render() {
    const { member, isLoading } = this.state

    return (
      (isLoading || member === null ? this.loadingView() : this.postContent())
    );
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  membersRowContainer: {
    backgroundColor: 'white',
  },
  flatListContainer: {
    justifyContent: 'center',
    marginBottom: 50
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 22,
    marginLeft: 5
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  nameLabel: {
    fontSize: 18,
    color: '#003366',
    marginLeft: 10,
    fontWeight: 'bold'
  },
  postInfoTopContainer: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#aaaaaa',
  },
  postAuthorInfoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  locationContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  locationLabel: {
    fontSize: 15,
    color: 'black',
    marginLeft: 10,

  },
  postContainer: {
  },

  postImage: {
    width: '100%',
    height: 230,
  },
  postCaption: {
    margin: 10,
    color: '#44484B',
    fontSize: 20,
  },
  postInteractionContainer: {

  },
  postInfoBottomContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  postDataContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  postDate: {
    marginLeft: 20,
    color: '#44484B',
    fontSize: 11,
  },
  postLikeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  postActionText: {
    marginLeft: 10,
    color: '#44484B',
    fontSize: 15,

  },
  commentsContainer: {
    backgroundColor: 'white',
  },
  commentContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(244,244,244,1)',
  },

  postUsernameLocationContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  commentAvatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginLeft: 10
  },
  postUsernameView: {
    flex: 1,
    justifyContent: 'center'
  },
  commentUsernameLabel: {
    fontSize: 14,
    color: '#003366',
    marginLeft: 10,
  },
  commentContentLabel: {
    flex: 1,
    fontSize: 15,
    color: '#111538',
    marginLeft: 10,
  },
  commentLocationContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  sectionLabel: {
    fontSize: 16,
    marginLeft: 10,
    color: '#737373',
    marginVertical: 7,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  defaultProfileAvatar: {
    height: 45,
    width: 45,
    borderRadius: 22,
    marginLeft: 5,
    borderColor: '#aaaaaa',
    borderWidth: 0.5,
  },
  defaultCommentAvatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginLeft: 10,
    borderColor: '#aaaaaa',
    borderWidth: 0.5,
  },
});