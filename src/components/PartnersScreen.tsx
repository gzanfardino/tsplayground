import React, {Component, useState} from 'react';
import { StyleSheet, View , Image, FlatList, TouchableOpacity, Text  } from 'react-native';
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import axios from "axios";


type RootStackParamList = {
  Login: undefined;
  Partners:  { bearerToken: string } | undefined;
  CreaPartner: undefined;
};

type PartnersScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Partners'
>;

type PartnersScreenRouteProp = RouteProp<RootStackParamList, 'Partners'>;

interface Partner {
    id: string;
    title: string;
    img: string;
}
type Props = {
    route: PartnersScreenRouteProp;
    navigation: PartnersScreenNavigationProp;
  };



class PartnersScreen extends React.Component<Props> {  
      
    constructor(props: any){
      super(props)
      this.state = {
        isLoading: true,
        dataSource: [],
        bearerToken: this.props.route.params
      }
    };

    componentDidMount() {
      
      let {bearerToken} = this.state
      var token = JSON.stringify({bearerToken}.bearerToken)
      token = token.substring(
        token.lastIndexOf(':"') + 2, 
        token.lastIndexOf('"')
      );
      let config = {
        headers: {
          'Authorization': 'Bearer ' +  token
        }
      }
      console.log("Test di arrivo: "+ token)
      axios.get('https://playground.alfonsino.delivery/api/partners?skip=0&per_page=19', config)
        .then( response => {
          this.setState({
            isLoading: false,
            dataSource: response.data
          })
        })
        .catch(error => console.log(error));
    }
    
    _renderItem = (result: {item: Partner}) => {
      return (
        <View style={partnersStyles.item}>
          <Image 
            source={{uri: result.item.img}}
            style={{width: 75, height: 75, margin:4}} 
          />  
          <View style={{justifyContent: 'center', paddingLeft: 10}}>
            <Text style={{fontSize: 20, fontWeight: "bold"}}>{result.item.title}</Text>
          </View>
        </View>
      )
    }


    render(){
      let {dataSource, isLoading} = this.state;
      const { navigation } = this.props;
      const handlePress = () => {
        navigation.navigate("CreaPartner");
      }
      return (
        
        <View style={partnersStyles.container}>
          <FlatList<Partner>
            style={{marginBottom: 0}}
            data={dataSource}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
          
          <TouchableOpacity
            style={{
                borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                alignItems:'center',
                justifyContent:'center',
                width:70,
                height:70,
                position: 'absolute',                                          
                bottom: 10,                                                    
                right: 10,
                backgroundColor:'#fff',
                borderRadius:100,
              }}
              onPress={() => handlePress()}
          >
            <Text style={{fontSize: 48}}>+</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

const partnersStyles = StyleSheet.create({
  
  item: {
    flex:1,
    padding: 5,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    borderTopWidth: 2,
    borderTopColor: '#eee',
    padding:  '2%',
    justifyContent: "space-between"
  },
});



export default PartnersScreen;