import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import DialogScreen from '../Dialog';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = () => {
  const [filteredUser, setAllfilteredUser] = useState([]);
  const {Allusers} = useSelector(state=>state.user)
  
  const dispatch = useDispatch()

  // Component Mount

  useEffect(() => {
    handleGetdata();
  }, []);


  // FilterUser
     



  // Api called-------------------------

  const handleGetdata = async () => {
    try {
    const token =   await AsyncStorage.getItem("ID")
    console.log(token)
      
      const {data} = await axios.get('https://chat-application-vineet.onrender.com/api/alluser');
      const filterData = data.users.filter((item)=>item._id !== token)
      setAllfilteredUser(filterData)
    } catch (error) {
      console.log('error', error);
    }
  };

  // View

  const {navigate} = useNavigation();
  return (
    // <View></View>
    <View style={{flex: 1}}>
      <FlatList
        data={filteredUser}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigate('Chat',{item, username:item.username})}
            style={{
              borderWidth: 1,
              paddingHorizontal: 20,
              height: 60,
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <Text style={{fontSize: 18,color:"black"}}>{item.username}</Text>
          </TouchableOpacity>
        )}
      />

      {/* <DialogScreen hideDialog={hideDialog} visible={visible} /> */}
    </View>
  );
};

export default Home;
