import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../homeScreen/Home';
import Chat from '../chatScreen/Chat';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen 
          name="Home"
          component={Home}
        />
        <Stack.Screen name="Chat" component={Chat} options={({route})=>({
          title:route.params?.username
        })} />
      </Stack.Navigator>
  )
}

export default HomeStack