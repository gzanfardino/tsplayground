import React, {Component, useState} from 'react';
import { StyleSheet, View , Image, Button, TextInput } from 'react-native';
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import axios from "axios";

type RootStackParamList = {
  Login: undefined;
  Partners:  {  } | undefined;
  CreaPartner: undefined;
};


type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;


type Props = {
    route: LoginScreenRouteProp;
    navigation: LoginScreenNavigationProp;
  };



function LoginScreen({ route, navigation }: Props) {
  const [email, setEMail] = useState('email');
  const [password, setPassword] = useState('password');

  var fields = {
    email,
    password
  }
  const handlePress = () => {
    axios.post('https://playground.alfonsino.delivery/api/auth/login', fields)
    .then(res => { 
      console.log(res.data.access_token)
      navigation.navigate("Partners", {bearerToken: res.data.access_token});
    })
  };

  return (
    <View style={loginStyles.container}>
      <Image 
        style={{width: 200, height: 200}}
        source={require("../images/logo.png")} 
      />  
      <TextInput
        style={{ marginBottom: 15, height: 35, width: 160, borderColor: 'gray', borderWidth: 1 }}
        placeholder={"email"}
        onChangeText={(text)=>setEMail(text)}
      />
      <TextInput
        style={{  marginBottom: 15, height: 35, width: 160, borderColor: 'gray', borderWidth: 1 }}
        placeholder={"password"}
        onChangeText={(text)=>setPassword(text)}
      />
      <Button title="Login" onPress={handlePress}/>
    </View>
    );
  };  

const loginStyles = StyleSheet.create({
  
  container: {
      paddingTop: '20%',
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingBottom: '40%'
  },
});



export default LoginScreen;