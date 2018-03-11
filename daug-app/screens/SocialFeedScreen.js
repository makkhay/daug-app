import React from 'react';
import { StyleSheet, Text, View, Image,ScrollView, FlatList, TouchableOpacity } from 'react-native';

import { SOCIAL_FEED_MOCK_DATA } from '../assets/SOCIAL_FEED_MOCK_DATA';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

import { Font } from 'expo';



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

      };
  }
  async componentDidMount() {
    await Font.loadAsync({
      'OpenSans-SemiBoldItalic': require('../assets/fonts/OpenSans-SemiBoldItalic.ttf')
    });
    this.setState({ fontLoaded: true });
  }



   // this will render one post
   renderItem = ({item}) => {
    const { navigate } = this.props.navigation
    const { liked } = this.state


    return(  
       <View style = { styles.itemContainer} key={item}  >
         <View style={styles.headerContainer}>
          <Image 
            source={{uri: item.image}}
            style={{
            width: 40,
            height: 40,
            borderRadius: 20,
          }}
        />
          
        <View style={styles.nameLocationContainer}>
         <TouchableOpacity style = {styles.nameContainer}
            onPress={() => navigate('FriendProfile',{user: item.user} )}
         >
           <Text style={styles.nameAndLocationContainer}> {item.user["name"]} </Text> 
         </TouchableOpacity> 
            <Text style={styles.nameAndLocationContainer}> {item.location}</Text>
        </View>
          
      </View>
        
    <TouchableOpacity  onPress={() => navigate('Post',{ post: item })}>
     <View style={styles.postContentContainer}>
       <Image
         source = {{uri: item.image}} 
         style = {{
            width: "100%",
            height: 400,
         }}
      />

      
        <View style = {styles.captionContainer}>
         <Text> {item.caption}</Text>
       </View>
       
     </View> 
   </TouchableOpacity>
  
      <View style = {styles.dateContainer}>
         <Text> {item.date}</Text>
     <TouchableOpacity  onPress={() => navigate('Post',{ post: item })}>
       <View style= {styles.iconButtonContainer}>
         <Ionicons
          name="ios-chatbubbles-outline"
          size={30}
          color='#085947'
          style={{paddingRight: 1}}
        />
        <Text style={styles.postActionText}>{item.comments ? item.comments.length : 0}</Text>
       </View>  
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => {  console.log('like pressed' + liked) 
        this.setState({ liked: !this.state.liked }); }} >
         <View style={[styles.postView, { marginRight: 15 }]}>
           <Ionicons
             name={liked ? "ios-heart" : "ios-heart-outline"}
             color={liked ? 'red' : 'black'} size={30} />
             <Text style={styles.postButtonText}>{item.likes}</Text>
         </View>
     </TouchableOpacity> 
    </View>
   </View> 
     )
   
   }

  render() {
 
    const { navigate } = this.props.navigation


    return ( 

     
     <View style={styles.mainContent}  >
        {this.state.fontLoaded &&
      <View style={styles.createPostContainer}>
        <TouchableOpacity onPress={() => navigate('CreatePost', { item: SOCIAL_FEED_MOCK_DATA[0] })} style={styles.createPostLabelContainer}>
          <Text style={styles.createPostLabel}>Create Post</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addPhotoIcon}>
          <Ionicons
            name='md-photos'
            size={30}
            color='#085947'
            style={{paddingRight: 1}}
          />
        </TouchableOpacity>
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
    
       <FlatList 
            style={styles.list}
            data = {SOCIAL_FEED_MOCK_DATA}
            style={styles.container}
            keyExtractor={(item, index) => index}
            renderItem={(item) => this.renderItem(item)}
        
      />
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
});
