import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addMessage, selectMessages} from '../redux/slice/chatSlice';
import {useDispatch, useSelector} from 'react-redux';

const Chat = ({route, roomId}) => {
  const [asyncId, setAsyncId] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [allmessages, setallmessages] = useState([])
  const {user} = useSelector(state=>state.user)

  const {
    params: {item},
  } = route;
  const dispatch = useDispatch();
  const socket = io('http://192.168.35.203:3000');

  // const socket = io('https://chat-application-vineet.onrender.com');

  useEffect(() => {
    getToken()
  }, [])


  const getToken = async () => {
    const AsyncId = await AsyncStorage.getItem('ID');
    setAsyncId(AsyncId);
  };
 
  
 
  

  useEffect(() => {
    socket.emit('new-user-add', asyncId);
    socket.on('get-users', users => {
      setOnlineUsers(users);
    });
  }, [asyncId]);
  

  useEffect(() => {
    socket.on('new_message', msg => {
      console.log('received Message', msg);
      setallmessages([...allmessages,msg])
    });
  }, []);

  const sendMessage = () => {
    const myMessage = {
      senderId : asyncId,
      receiverId: item._id,
      text: message,
    };
    socket.emit('send_message', myMessage);
    console.log('mymessage', myMessage);
    setMessage('');
  };

  return (
    // <View></View>
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {allmessages.map((msg, index) => (
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
