import React from 'react';
import { StyleSheet, Text, View, Image,ScrollView, FlatList, TouchableOpacity } from 'react-native';

import { SOCIAL_FEED_MOCK_DATA } from '../assets/SOCIAL_FEED_MOCK_DATA';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';



export default class SocialFeedScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log("log 1");
    
    this.state = { screen: null  };
  }
  
  renderProfile= () => {
    this.setState({ screen: 'ProfileScreen' })
    console.log("test");
    
  }

   // this will render one post
   renderItem = ({item}) => {
    return(
    <View style = { styles.itemContainer}>
       
       <View style={styles.headerContainer}>
        <Image 
          source={{uri: item.image}}
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
          }}
        />
       
        <View style={styles.nameLocationContainer}>
         <TouchableOpacity style = {styles.nameContainer}
           onPress={this.renderProfile} 
         >
           <Text style={styles.nameContainer}> {item.name} </Text> 
         </TouchableOpacity> 
          <Text style={styles.locationContainer}> {item.location} </Text>
        </View>
      </View>


    <Image
         source = {{uri: item.post["image"]}} 
         style = {{
            width: "100%",
            height: 400,
         }}
      />

     <View style = {styles.captionContainer}>
         <Text> {item.post["caption"]}</Text>
      </View>

      <View style = {styles.dateContainer}>
            <Text> {item.post["date"]}</Text>
        <View style= {styles.iconButtonContainer}>
       
         <Ionicons
          name="ios-heart-outline"
          size={30}
          color='#085947'
          style={{paddingRight: 8}}
          />

        <Ionicons
         name="ios-chatbubbles-outline"
         size={30}
         color='#085947'
         style={{paddingRight: 8}}
        />

         <Ionicons
          name="ios-paper-plane-outline"
          size={30}
           color='#085947'
         />
     
        </View>
      </View>
    </View>
     )

   }


  render() {
 
    const { screen } = this.state

    if (screen === 'ProfileScreen') {
      return <ProfileScreen />;
    }

    return (

    <ScrollView style = {styles.scrollContainer}>  
    
       <FlatList 
            data = {SOCIAL_FEED_MOCK_DATA}
            style={styles.container}
            renderItem={(item,seperator) => this.renderItem(item, seperator)}
        
      />
    </ScrollView>  
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer : {
    flexGrow: 1,
  },

  list: {
    flexGrow :1
  },
  itemContainer: {
    flex: 1
  },
  headerContainer: {
    flexDirection : 'row',
    justifyContent: 'flex-start',
    alignItems: 'center', 
  
  },

   nameLocationContainer : {
    paddingLeft: 5,
   } ,
   locationContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    
  },
  nameContainer:{
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  
  captionContainer: {
    paddingTop: 5,
    justifyContent: 'space-around'
  },

  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButtonContainer : {
    flexDirection: 'row',
    alignItems: 'center',
  }
  

});
