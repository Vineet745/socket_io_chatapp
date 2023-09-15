import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput,ScrollView} from 'react-native';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addMessage, selectMessages} from '../redux/slice/chatSlice';
import {useDispatch, useSelector} from 'react-redux';

const Chat = ({route}) => {
  const [asyncId, setAsyncId] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [allmessages, setallmessages] = useState([]);
  const {user} = useSelector(state => state.user);
  let currentuser = user._id;

  const {
    params: {item},
  } = route;

  const roomId =
    item._id < currentuser ? item._id + currentuser : currentuser + item._id;
  const dispatch = useDispatch();
  // const socket = io('http://192.168.35.203:3000');

  const socket = io('https://chat-application-vineet.onrender.com');

  // useEffect(() => {
  //   socket.emit('new-user-add', user._id);
  //   socket.on('get-users', users => {
  //     setOnlineUsers(users);
  //   });
  // }, []);

  useEffect(() => {
    socket.emit('new-user-add', roomId, user._id);
    socket.on('get-users', users => {
      setOnlineUsers(users);
    });
  }, []);

  useEffect(() => {
    socket.on('new_message', data => {
      console.log('new_message', data);
      setallmessages(prev => [...prev, data]);
    });
  }, []);

  console.log(allmessages);

  const sendMessage = () => {
    const myMessage = {
      senderId: currentuser,
      receiverId: item._id,
      text: message,
      roomId: roomId,
    };
    socket.emit('send_message', myMessage);
    console.log('mymessage', myMessage);
    // setallmessages(prev => [...prev, myMessage]);
    setMessage('');
  };


const isMyMessage = (msg) => msg.senderId === currentuser;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.messageContainer}>
        {allmessages.map((msg, index) => (
          <View key={index} style={[styles.message, isMyMessage(msg) ? styles.rightMessage : styles.leftMessage]}>
            <Text style={{ color: 'black', fontSize: 18 }}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={value => setMessage(value)}
          placeholder="Type Message"
          placeholderTextColor={"black"}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  messageContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingVertical:5,
    backgroundColor:"#e7e1d9"
  },
  message: {
    borderRadius: 10,
    marginVertical: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
    minWidth: '30%',
  },
  leftMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    padding:10
  },
  rightMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d5f0c0',
    padding:10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginbottom:40
  },
  input: {
    borderWidth: 1,
    flex: 1,
    marginRight: 10,
    borderRadius:30,
    paddingHorizontal:20
  },
  sendButton: {
    backgroundColor: 'lightblue',
    width: 60,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
};


export default Chat;
