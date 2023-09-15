import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addMessage, selectMessages} from '../redux/slice/chatSlice';
import {useDispatch, useSelector} from 'react-redux';

const Chat = ({route}) => {
  const [asyncId, setAsyncId] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [allmessages, setallmessages] = useState([])
  const {user} = useSelector(state=>state.user)
  let currentuser = user._id

  const {
    params: {item},
  } = route;

  const roomId = item._id < currentuser ? item._id + currentuser : currentuser + item._id
  const dispatch = useDispatch();
  const socket = io('http://192.168.35.203:3000');

  // const socket = io('https://chat-application-vineet.onrender.com');

  
 
  // useEffect(() => {
  //   socket.emit('new-user-add', user._id);
  //   socket.on('get-users', users => {
  //     setOnlineUsers(users);
  //   });
  // }, []);
  

  useEffect(() => {
    socket.emit('new-user-add', roomId,user._id);
    socket.on('get-users', users => {
      setOnlineUsers(users);
    });
  }, []);
  


  useEffect(() => {
    socket.on('new_message',(data)=>{
      console.log("new_message",data)
      setallmessages(prev=>[...prev,data])
    })
  }, []);

console.log(allmessages)

  const sendMessage = () => {
    const myMessage = {
      senderId : currentuser,
      receiverId: item._id,
      text: message,
      roomId:roomId
    };
    socket.emit('send_message', myMessage);
    console.log('mymessage', myMessage);
    setallmessages(prev=>[...prev,myMessage])
    setMessage('');
  };
  return (
    // <View></View>
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {allmessages.map((msg, index) => (
          <View key={index}>
            {msg.receiverId === user._id ?<View style={{ borderWidth: 1, borderRadius: 10,height:50,marginVertical:10,justifyContent:"center" ,paddingHorizontal:10,width:280}}>
                <Text style={{color:"black",fontSize:18}}>{msg.text}</Text>
              </View>:<View style={{ borderWidth: 1, borderRadius: 10,height:50,marginVertical:10,justifyContent:"center" ,paddingHorizontal:10,width:280,position:'absolute',right:0}}>
                <Text style={{color:"black",fontSize:18}}>{msg.text}</Text>
              </View>}
            
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
