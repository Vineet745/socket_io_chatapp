import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Background from '../Background';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import registerstyle from './registerstyle';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import { getUser } from '../redux/slice/userSlice';
import { useNavigation } from '@react-navigation/native';
const Signup = props => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const dispatch = useDispatch();
  const {navigate} = useNavigation()
  // Handlers

  const {user} = useSelector((state)=>state.user)
  console.log("Redux User",user)

  // Register Handler

  const handleRegister = async (data) => {
    try {
     const response = await axios.post("http://192.168.35.203:3000/api/register",data)
     await AsyncStorage.setItem("ID",response.data.user._id)
     dispatch(getUser(response.data.user))
     navigate('Home')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Background>
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
                value={field.value}
                onChangeText={field.onChange}
              />
              {errors.password && <Text>{errors.password.message}</Text>}
            </>
          )}
        />

        <TouchableOpacity activeOpacity={1}
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
        <TouchableOpacity onPress={()=>navigate('Home')} style={{marginTop:15}}>
          <Text style={{color:"blue",alignSelf:"center"}}>Go to home</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default Signup;
