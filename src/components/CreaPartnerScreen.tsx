import React, {Component, useState} from 'react';
import { StyleSheet, View , Button, TextInput  } from 'react-native';
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import axios from "axios";

type RootStackParamList = {
    Login: undefined;
    Partners:  { bearerToken: string } | undefined;
    CreaPartner: undefined;
};

type CreaPartnerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreaPartner'
>;

type CreaPartnerScreenRouteProp = RouteProp<RootStackParamList, 'CreaPartner'>;

type Props = {
    route: CreaPartnerScreenRouteProp;
    navigation: CreaPartnerScreenNavigationProp;
};

function CreaPartnerScreen({ route, navigation }: Props) {
    const [title, setTitle] = useState('partnerTitle');
    
    const handlePress = () => {
      axios.post('https://playground.alfonsino.delivery/api/partners', {title})
      .then(res => { 
        console.log(res);
        console.log(res.data);
        navigation.navigate("Partners");
      })
    };
  
    return (
      <View style={creaPartnerStyles.container}>
        <TextInput
          style={{ marginTop: 150, height: 35, width: 250, marginBottom: 50, borderColor: 'gray', borderWidth: 1 }}
          placeholder={"New Partner Title"}
          onChangeText={(text)=>setTitle(text)}
        />
        <Button title="Crea Partner" onPress={handlePress}/>
        
      </View>
    );
  }

  
const creaPartnerStyles = StyleSheet.create({
  
    container: {
        paddingTop: '20%',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: '50%'
    },
  });
  


  export default CreaPartnerScreen;