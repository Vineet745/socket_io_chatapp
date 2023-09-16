


const Stack = createNativeStackNavigator();

import { View, Text } from 'react-native'
import React,{useEffect,useState} from 'react'
import Splash from '../Splash';
import Login from '../login/Login';
import Register from '../register/Register';

const { createNativeStackNavigator } = require("@react-navigation/native-stack");
const AuthStack = () => {

    const [splashTimer, setSplashTimer] = useState(true);
    useEffect(() => {
      const timer = setTimeout(() => {
        setSplashTimer(false);
      }, 3000);
  
      return () => clearTimeout(timer);
    }, []);
    if (splashTimer) {
      return <Splash />;
    }


  return (
    <Stack.Navigator>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}

export default AuthStack