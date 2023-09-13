import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {MainStack} from './src/navigation/MainStack';
import io from 'socket.io-client';

const App = () => {




  
  return (
    <View style={{flex: 1}}>
      <MainStack/>
    </View>
  );
};

export default App;
