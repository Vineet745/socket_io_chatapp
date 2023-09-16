import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Background from '../Background';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import registerstyle from './registerstyle';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import {getUser, registerUser} from '../redux/slice/userSlice';
import {useNavigation} from '@react-navigation/native';
const Signup = props => {
  const [loading, setloading] = useState(false);
  const {user} = useSelector(state => state.user);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  // Handlers

  // Register Handler

  const handleRegister = async data => {
    try {
      setloading(true);
      const response = await axios.post(
        'https://chat-application-vineet.onrender.com/api/register',
        data,
      );
      const Id = response.data.user._id
      await AsyncStorage.setItem('ID', Id);
      dispatch(registerUser(Id));
      navigate('Home');
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <Background>
      <Modal visible={loading} transparent={true} animationType="none">
        <View
          style={{
            height: 60,
            width: 60,
            justifyContent: 'center',
            position: 'absolute',
            top: 340,
            left: 150,
            alignItems: 'center',
            backgroundColor: 'black',
            borderRadius: 20,
          }}>
          <ActivityIndicator size="large" color="lightgreen" />
        </View>
      </Modal>

      <View style={registerstyle.registerView}>
        <Text style={registerstyle.outertext}>Register User</Text>
      </View>
      <View style={registerstyle.container}>
        <Controller
          control={control}
          name="username"
          rules={{required: 'Username is required'}}
          defaultValue=""
          render={({field}) => (
            <>
              <Text style={{color: 'black', marginLeft: 30, fontSize: 20}}>
                UserName
              </Text>
              <TextInput
                style={registerstyle.inputbox}
                placeholder="Enter Your UserName"
                placeholderTextColor={'black'}
                value={field.value}
                onChangeText={field.onChange}
              />
              {errors.username && <Text>{errors.username.message}</Text>}
            </>
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={{required: 'Name is required'}}
          defaultValue=""
          render={({field}) => (
            <>
              <Text style={{color: 'black', marginLeft: 30, fontSize: 20}}>
                Email
              </Text>
              <TextInput
                style={registerstyle.inputbox}
                placeholder="Enter Your Email"
                placeholderTextColor={'black'}
                value={field.value}
                onChangeText={field.onChange}
              />
              {errors.email && <Text>{errors.email.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{required: 'Password is required'}}
          defaultValue=""
          render={({field}) => (
            <>
              <Text style={{color: 'black', marginLeft: 30, fontSize: 20}}>
                Password
              </Text>
              <TextInput
                style={registerstyle.inputbox}
                placeholder="Enter Your Password"
                placeholderTextColor={'black'}
                value={field.value}
                onChangeText={field.onChange}
              />
              {errors.password && <Text>{errors.password.message}</Text>}
            </>
          )}
        />

        <TouchableOpacity
          activeOpacity={1}
          onPress={handleSubmit(handleRegister)}
          style={{
            backgroundColor: 'violet',
            marginTop: 20,
            width: '90%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white', fontSize: 16}}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate('Login')}
          style={{marginTop: 15}}>
          <Text style={{color: 'blue', alignSelf: 'center'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate('Home')}
          style={{marginTop: 15}}>
          <Text style={{color: 'blue', alignSelf: 'center'}}>Home</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default Signup;
