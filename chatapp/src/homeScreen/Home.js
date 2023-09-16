import {View, Text, TouchableOpacity, FlatList,ActivityIndicator,Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import DialogScreen from '../Dialog';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = () => {
  const [filteredUser, setAllfilteredUser] = useState([]);
  const [loading, setloading] = useState(false);
  const {Allusers} = useSelector(state => state.user);

  const dispatch = useDispatch();

  // Component Mount

  useEffect(() => {
    handleGetdata();
  }, []);

  // FilterUser

  // Api called-------------------------

  const handleGetdata = async () => {
    try {
      setloading(true)
      const token = await AsyncStorage.getItem('ID');
      console.log(token);

      const {data} = await axios.get(
        'https://chat-application-vineet.onrender.com/api/alluser',
      );
      const filterData = data.users.filter(item => item._id !== token);
      setAllfilteredUser(filterData);
    } catch (error) {
      console.log('error', error);
    }finally {
      setloading(false);
    }
  };

  // View

  const {navigate} = useNavigation();
  return (
    <View style={{flex: 1, paddingVertical: 10, backgroundColor: '#e7e1d9'}}>
      <FlatList
        data={filteredUser}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigate('Chat', {item, username: item.username})}
            style={{
              borderWidth: 1,
              paddingHorizontal: 20,
              height: 60,
              borderRadius: 30,
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <Text style={{fontSize: 18, color: 'black'}}>{item.username}</Text>
          </TouchableOpacity>
        )}
      />
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
    </View>
  );
};

export default Home;
