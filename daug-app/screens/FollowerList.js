import React from 'react';
import { StyleSheet, Text, View , ScrollView, Image, TouchableOpacity, FlatList} from 'react-native';


import COVER from '../assets/Cover.png'
import { Font } from 'expo';
import { SOCIAL_FEED_MOCK_DATA } from '../assets/SOCIAL_FEED_MOCK_DATA';
import SocialFeedScreen from './SocialFeedScreen';


export default class FollowerList extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: "Profile",
    headerTintColor: '#03A9F4',
    headerTitleStyle: {
      fontSize: 20
    },
   
  
  });


  constructor(props){
    super(props);

    const user = props.navigation.state.params && props.navigation.state.params.user
  
    state = {
      fontLoaded: false,
    };
    this.state = { 
      fontLoaded: false,
      user: user || SOCIAL_FEED_MOCK_DATA[0].user,
     
     };
  
  }
 
  async componentDidMount() {
    await Font.loadAsync({
      'OpenSans-SemiBoldItalic': require('../assets/fonts/OpenSans-SemiBoldItalic.ttf')
    });
    this.setState({ fontLoaded: true });
  }

  _renderItem = ({item: post}) => {
    const { liked } = this.state
    const { navigate , isFeedLoading} = this.props.navigation

    return (
   <View style = { styles.itemContainer}>
      <View style={styles.headerContainer}>
      {/* {this._renderProfileImage(post.user.profile_image)}   */}
     
      <View style={styles.nameLocationContainer}>
       <Text style={styles.nameAndLocationContainer}> {post.user.name} </Text> 
          <Text style={styles.timeAndLocationStamp}>SF</Text>
      </View>
    </View>
    
</View> 

)
  }



  render() {
    const { navigate } = this.props.navigation
    const { isFeedLoading, user} = this.state;
   
    return (
      
      <View style ={styles.container}>

  
  <FlatList
            style={styles.list}
            data={SOCIAL_FEED_MOCK_DATA}
            renderItem={ ({item}) => (
            
           
              <View style={styles.itemContainer}> 
                <View style={styles.imageNameContainer}>
                  <Image 
                    source={{uri: user.profile_image}} 
                    style={
                      { 
                        width: 60, 
                        height: 60,
                        borderRadius: 30
                      }}
                  />
                  <View style={styles.textNameContainer}>
                    <Text style={styles.itemName}> {item.name} </Text>
                  </View>
                </View>
             </View>
          
            )}
          />

    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  scrollView:{
    backgroundColor:'black',
    flexDirection: 'column',
  },
  bigImgeContainer: {
    flexDirection: 'row',
    alignContent:'center',
    justifyContent:'center',
  },
  smallImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'black'
  },
  bigImage : {
    flex:1,
  },
  smallImage: {
    height: 150,
    width:150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#CDDC39',
  },
  smallImageRectangle: {
    height: 150,
    width:150,
    borderWidth: 2,
    borderColor: '#CDDC39',
  },

  buttonContainer: {
    flex:1,
  },

  toggleContainer: {
    height: 200,
    justifyContent: 'center',
    backgroundColor: 'white'
  },

  textInput: {
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#fff',
      padding: 5,
      height: 40,
      color: '#fff'
  
  },
  textInputContainer: {
    
    alignContent: 'center',
    justifyContent: 'center',
    padding: 20,
    //black
    backgroundColor: 'black'
  },
  imageNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    borderBottomWidth: 1,
    borderColor:'#000'
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    borderBottomWidth: 1,
    borderColor:'#000'
  },
  textNameContainer: {
    justifyContent: 'center',

  },
  list: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    flex: 1,

    
  }, headerContainer: {
    flexDirection : 'row',
    paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center', 
    
  
  }, nameLocationContainer : {
    paddingLeft: 5,


   } ,
   nameAndLocationContainer:{
    flexDirection: 'column',
    justifyContent: 'space-around',
    fontWeight: 'bold',
    fontSize: 14
    

    

  },
  timeAndLocationStamp:{
    fontSize: 11
  }
  

});