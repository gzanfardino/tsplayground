import React from 'react';
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import {   CardStyleInterpolators, createStackNavigator, StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

import LoginScreen from "./LoginScreen"
import PartnersScreen from "./PartnersScreen"
import CreaPartnerScreen from "./CreaPartnerScreen"

type RootStackParamList = {
    Login: undefined;
    Partners:  { bearerToken: string } | undefined;
    CreaPartner: undefined;
};



const RootStack = createStackNavigator<RootStackParamList>();

export default function Navigator() {
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName="Login">
                <RootStack.Screen name="Login" component={LoginScreen} />
                <RootStack.Screen
                    name="Partners"
                    component={PartnersScreen}
                    initialParams={{ bearerToken: "" }}
                />
                <RootStack.Screen
                    name="CreaPartner"
                    component={CreaPartnerScreen}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
  }
  