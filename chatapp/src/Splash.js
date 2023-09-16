import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Background from './Background';
import {useDispatch} from 'react-redux';
import {registerUser} from './redux/slice/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = props => {
  const dispatch = useDispatch();

  const checklogin = async () => {
    try {
      const Id = await AsyncStorage.getItem('ID');
      dispatch(registerUser(Id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checklogin();
  }, []);

  return (
    <Background>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 40, alignItems: 'center', color: 'black'}}>
          Chat Application
        </Text>
      </View>
    </Background>
  );
};

export default Splash;
