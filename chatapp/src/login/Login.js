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
  import {useForm, Controller} from 'react-hook-form';
  import axios from 'axios';
  import { getUser, loginUser } from '../redux/slice/userSlice';
  import { useNavigation } from '@react-navigation/native';
import registerstyle from '../register/registerstyle';


  const Login = props => {
    const {
      control,
      handleSubmit,
      formState: {errors},
    } = useForm();
    const dispatch = useDispatch();
    const {navigate} = useNavigation()
    // Handlers
    
  
  
    // Register Handler
  
    const handleLogin = async (data) => {
      try {
       const response = await axios.post("https://chat-application-vineet.onrender.com/api/login",data)
       console.log("Response",response.data.validateEmail[0]._id)
       await AsyncStorage.setItem("ID",response.data.validateEmail[0]._id)
       dispatch(loginUser(response.data.validateEmail[0]))
       navigate('Home')
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <Background>
        <View style={registerstyle.registerView}>
          <Text style={registerstyle.outertext}>Login User</Text>
        </View>
        <View style={registerstyle.container}>
          
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
                  placeholderTextColor={"black"}
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
                  placeholderTextColor={"black"}
                  value={field.value}
                  onChangeText={field.onChange}
                />
                {errors.password && <Text>{errors.password.message}</Text>}
              </>
            )}
          />
  
          <TouchableOpacity activeOpacity={1}
          onPress={handleSubmit(handleLogin)}
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
          <TouchableOpacity onPress={()=>navigate('Register')} style={{marginTop:15}}>
            <Text style={{color:"blue",alignSelf:"center"}}>Not a user ? Register</Text>
          </TouchableOpacity>
        </View>
      </Background>
    );
  };
  
  export default Login;
  