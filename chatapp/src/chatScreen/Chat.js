import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {addMessage, selectMessages} from '../redux/slice/chatSlice';
import {useDispatch, useSelector} from 'react-redux';
import EvillIcons from 'react-native-vector-icons/EvilIcons';
import {launchImageLibrary} from 'react-native-image-picker';

const Chat = ({route}) => {
  // States and Imports

  const [asyncId, setAsyncId] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [allmessages, setallmessages] = useState([]);
  const [imagedata, setImagedata] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const [check, setCheck] = useState(false);
  const {userId} = useSelector(state => state.user);
  let currentuser = userId;

  const {
    params: {item},
  } = route;

  const roomId =
    item._id < currentuser ? item._id + currentuser : currentuser + item._id;
  const socket = io('http://192.168.35.203:3000');

  // const socket = io('https://chat-application-vineet.onrender.com');

  useEffect(() => {
    socket.emit('new-user-add', roomId, userId);
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

 


  const sendMessage = () => {
    if (imageUrl) {
      // Send image message
      const myImageMessage = {
        senderId: currentuser,
        receiverId: item._id,
        imageUrl: imageUrl, 
        roomId: roomId,
      };
      socket.emit('send_message', myImageMessage);
      setImageUrl(''); 
    } else if (message.trim()) {
      // Send text message
      const myTextMessage = {
        senderId: currentuser,
        receiverId: item._id,
        text: message,
        roomId: roomId,
      };
      socket.emit('send_message', myTextMessage);
    }
  
    setMessage('');
  };




  // Image Library

  const imagelibrary = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    uploadImage(result)
    console.log(result);
  };

  const uploadImage = async (result) => {
    console.log(result,"resu;t")
    try {
      const reference = storage().ref(result.assets[0].fileName);
      const pathToFile = result.assets[0].uri;
      await reference.putFile(pathToFile);
      const url = await storage()
        .ref(result.assets[0].fileName)
        .getDownloadURL();
        console.log(url)
         setImageUrl(url);
    } catch (error) {
      console.log('error', error);
    }
  };
  const isMyMessage = msg => msg.senderId === currentuser;

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.messageContainer}>
          {allmessages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.message,
                isMyMessage(msg) ? styles.rightMessage : styles.leftMessage,
              ]}>
              <Text style={{color: 'black', fontSize: 18}}>{msg.imageUrl ? (
                <View style={{height:200,width:300}}>
                <Image
                  source={{ uri: msg.imageUrl }}
                  style={{ width: "100%" ,height:"100%",borderRadius:20}}
                />
                </View>
              ) : (
                <Text style={{ color: 'black', fontSize: 18 }}>
                  {msg.text}
                </Text>
              )}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={value => setMessage(value)}
            placeholder="Message"
            placeholderTextColor={'black'}
          />

          <TouchableOpacity onPress={imagelibrary} style={{marginRight: 10}}>
            <EvillIcons style={{color: 'black'}} name="image" size={30} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={{color: 'black'}}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = {
  messageContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingVertical: 5,
    backgroundColor: '#e7e1d9',
  },
  message: {
    borderRadius: 10,
    marginVertical: 6,
    justifyContent: 'center',
    paddingHorizontal: 10,
    minWidth: '30%',
  },
  leftMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    padding: 10,
  },
  rightMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d5f0c0',
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: '#e7e1d9',
  },
  input: {
    borderWidth: 1,
    flex: 1,
    marginRight: 10,
    borderRadius: 30,
    paddingHorizontal: 20,
    color: 'black',
    width: 150,
  },
  sendButton: {
    backgroundColor: 'lightblue',
    width: 60,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    color: 'black',
  },
};

export default Chat;
