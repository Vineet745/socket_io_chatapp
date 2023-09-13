import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addMessage, selectMessages } from '../redux/slice/chatSlice';
import { useDispatch, useSelector } from 'react-redux';

const Chat = ({ route,roomId }) => {
  const [asyncId, setAsyncId] = useState('');
  const socket = io('http://192.168.35.203:3000');
  const [message, setMessage] = useState('');
  const messages = useSelector(selectMessages);
    const { params: { item } } = route;
  const dispatch = useDispatch()

  const getToken = async () => {
    const AsyncId = await AsyncStorage.getItem('ID');
    setAsyncId(AsyncId);
  };


  useEffect(() => {
    getToken();
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);


  const sendMessage = () => {
    if (message) {
      const myMessage = {
            senderId: asyncId,
            receiverId: item._id,
            text: message,
          };
          socket.emit('send_message', myMessage);
          dispatch(addMessage(myMessage));
          setMessage('');
    }
  };


  useEffect(() => {
    socket.on('new_message', (msg) => {
      console.log("received Message",msg)
      dispatch(addMessage(msg));
    });
  }, [dispatch]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {messages.map((msg, index) => (
          <View key={index}>
            {msg.receiverId === item._id && 
            (<View style={{ borderWidth: 1, borderRadius: 10,height:50,marginVertical:10,justifyContent:"center" ,paddingHorizontal:10,width:280}}>
                <Text style={{color:"black",fontSize:18}}>{msg.text}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <TextInput
          style={{ borderWidth: 1, width: '80%' }}
          value={message}
          onChangeText={value => setMessage(value)}
          placeholder="Type Message"
        />
        <TouchableOpacity
          style={{
            backgroundColor: 'lightblue',
            width: 60,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}
          onPress={sendMessage}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
