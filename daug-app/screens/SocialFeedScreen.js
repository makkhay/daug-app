import React from 'react';
import { StyleSheet, Text, View, Image,ScrollView, FlatList, TouchableOpacity , Alert, DeviceEventEmitter} from 'react-native';
import { SOCIAL_FEED_MOCK_DATA } from '../assets/SOCIAL_FEED_MOCK_DATA';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Font } from 'expo';
import COVER from '../assets/Cover.png'

import { timeSince } from '../util/helper';

export default class SocialFeedScreen extends React.Component {


  static navigationOptions = ({ navigation }) => ({
   
    title: 'Daug',
    headerTintColor: '#03A9F4',
    headerTitleStyle: {
      fontSize: 20,
    },
  });

  constructor(props) {
    super(props);
    

    const {liked } = this.props;

    state = {
      fontLoaded: false,
    };
    
    this.state = {
      commented: false,
      liked: false,
      isFeedLoading: false,
      posts: null,

      };
  }
  async componentDidMount() {
    await Font.loadAsync({
      'OpenSans-SemiBoldItalic': require('../assets/fonts/OpenSans-SemiBoldItalic.ttf')
    });
    this.setState({ fontLoaded: true });
    this.getFeed();
    

  }

  componentWillMount() {
    DeviceEventEmitter.addListener('new_post_created', (e) => {
      this.getFeed()
      
    })
  }


   async getFeed() {
  
    try {
      let response = await fetch(`https://daug-app.herokuapp.com/api/feed`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
      });

      let responseJSON = null

      if (response.status === 200) {

        responseJSON = await response.json();
        console.log(responseJSON)

        //save the posts 
        this.setState({
          isFeedLoading: false,
          posts: responseJSON,
        })
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ errors: responseJSON.errors })
        Alert.alert('Unable to get your feed', `Reason.. ${error}!`)
      }
    } catch (error) {
        this.setState({ isLoading: false, response: error })
  
        console.log(error)
  
        Alert.alert('Unable to get the feed. Please try again later')
      }
    }

    _renderImage = (image) => {
      // render big image
      if(image){
        return(
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

    _renderProfileImage = (image) =>{
      // render profile image
      if(image){
        return(
          <Image
          source = {{uri: image}} 
          style = {{
            width: 30,
            height: 30,
            borderRadius: 15,
          }}
       /> 
      )
      }  // if image is null
      else {
       return (
         <Image 
         style = {{
          width: 30,
          height: 30,
          borderRadius: 15,
        }}
         source={COVER}
         resizeMode='cover'
         />
 
       )
     }


    }

    _renderDescription = (description) => {
     // render Description 
     if(description){
       return( 
          <Text> {description}</Text>

       )
     }

    }

    _renderItem = ({item: post}) => {
      const { liked } = this.state
      const { navigate , isFeedLoading} = this.props.navigation

      
      return (
     <View style = { styles.itemContainer}>
        <View style={styles.headerContainer}>
        {this._renderProfileImage(post.user.profile_image)}  
       
        <View style={styles.nameLocationContainer}>
         <TouchableOpacity style = {styles.nameContainer}
            onPress={() => navigate('FriendProfile',{user: post.user} )}
         >
         <Text style={styles.nameAndLocationContainer}> {post.user.name} </Text> 
         </TouchableOpacity> 
            <Text style={styles.timeAndLocationStamp}>SF</Text>
        </View>
      </View>
        
    {/* <TouchableOpacity  onPress={() => navigate('Post',{ user: post.user})}> */}
     <View style={styles.postContentContainer}>
    
     {this._renderImage(post.image)}
     
  
     </View> 
   {/* </TouchableOpacity> */}

   <View style ={styles.descriptionContainer}>
   {this._renderDescription(post.description)}
   </View>
  
   <View style = {styles.dateContainer}>
     
         <Text style={styles.timeAndLocationStamp}>{timeSince(post.createdAt)}</Text>

      <TouchableOpacity  onPress={() => Alert.alert('Coming soon')}>
       <View style= {styles.iconButtonContainer}>
         <Ionicons
          name="ios-chatbubbles-outline"
          size={30}
          color='#085947'
          style={{paddingRight: 1}}
      
        />
        <Text style={styles.postActionText}>{post.comments ? post.comments.length : 0}</Text>
       </View>  
       </TouchableOpacity>

      <TouchableOpacity  onPress={() => {  console.log('like pressed' + liked) 
        this.setState({ liked: !this.state.liked }); }} >
         <View style={[styles.postView, { marginRight: 15 }]}>
           <Ionicons
             name={liked ? "ios-heart" : "ios-heart-outline"}
             color={liked ? 'red' : 'black'} size={30}/>
             <Text style={styles.postButtonText}>{post.likes.length}</Text>
         </View>
     </TouchableOpacity> 
    </View>
    
 
 </View> 
 
  )
     
 }




  render() {
 
    const { navigate } = this.props.navigation
    const { isFeedLoading, posts} = this.state;
   

    return ( 

     
     <View style={styles.mainContent}  >
        {this.state.fontLoaded &&
      <View style={styles.createPostContainer}>
        <TouchableOpacity onPress={() => navigate('CreatePost', { item: SOCIAL_FEED_MOCK_DATA[0] })} style={styles.createPostLabelContainer}>
          <Text style={styles.createPostLabel}>Create Post</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.addPhotoIcon}>
          <Ionicons
            name='md-photos'
            size={30}
            color='#085947'
            style={{paddingRight: 1}}
          />
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.addPhotoIcon} onPress={() => navigate('CreatePost', { item: SOCIAL_FEED_MOCK_DATA[0] })}>
          <Ionicons
            name='md-share'
            size={30}
            color='#085947'
            style={{paddingRight: 1}}
          />
        </TouchableOpacity>
      </View>  
      } 
     

    <ScrollView style = {styles.scrollContainer}>  
       {!isFeedLoading && 
       <FlatList 
            style={styles.list}
            data = {posts}
            style={styles.container}
            keyExtractor={(item, post) => post}
            renderItem={({item}) => this._renderItem({item})}
            onRefresh={() => this.getFeed()}
            refreshing={!isFeedLoading}
           
         />
       }
       
    </ScrollView>  
    
    </View>
  
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,

  },
  createPostContainer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',

  },createPostLabelContainer: {
    flex: 10,
    marginLeft: 20
  },
  createPostLabel: {
    fontSize: 18,
    color: '#03A9F4',
    fontWeight: 'bold',
    fontFamily: 'OpenSans-SemiBoldItalic'

  },addPhotoIcon: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 20,
  },
  scrollContainer : {
    flexGrow: 1,
  },

  list: {
    flexGrow :1
  },
  itemContainer: {
    flex: 1,

    
  },
  headerContainer: {
    flexDirection : 'row',
    paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center', 
    
  
  },

   nameLocationContainer : {
    paddingLeft: 5,


   } ,
   
  nameAndLocationContainer:{
    flexDirection: 'column',
    justifyContent: 'space-around',
    fontWeight: 'bold',
    fontSize: 14
    

    

  },
  
  captionContainer: {
    backgroundColor: '#f9f9f9',
    paddingTop: 5,
    justifyContent: 'space-around',
    marginBottom: 10,

  },

  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  iconButtonContainer : {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 160
    
  },
  list: {
    flex: 1,
  },
  
  postButtonText: {
    marginLeft: 10,
    color: '#44484B',
    fontSize: 15,
    


  },
  postContentContainer: {
    backgroundColor: '#f9f9f9',

  },
  postView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  postInteractiveButtonContainer: {
    marginLeft: 0,
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  descriptionContainer: {
    paddingTop: 5,
    justifyContent: 'space-around',

  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#aaaaaa',
    marginTop: -25
  },
  timeAndLocationStamp:{
    fontSize: 11
  }
});
