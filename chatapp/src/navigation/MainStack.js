import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../homeScreen/Home';
import React,{useState,useEffect} from 'react';
import Splash from '../Splash';
import {useSelector} from 'react-redux';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
const Stack = createNativeStackNavigator();

export const MainStack = ({route}) => {
  const [SplashTimer, setSplashTimer] = useState(true)
  const {userId} = useSelector(state => state.user);

console.log("userId hai",userId)
  
  return (
    <NavigationContainer>
      {userId? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
