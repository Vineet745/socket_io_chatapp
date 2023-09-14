import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../homeScreen/Home';
import Chat from '../chatScreen/Chat';
import {Image, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import DialogScreen from '../Dialog';
import Register from '../register/Register';
import Login from '../login/Login';
const Stack = createNativeStackNavigator();

export const MainStack = ({route}) => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
        <Stack.Screen 
          name="Home"
          component={Home}
          options={{
            headerRight: () => (
              <TouchableOpacity onPress={showDialog}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: 90,
                }}>
                <Image source={require('../assets/icons8-user-30.png')} />
                <Text>Add User</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="Chat" component={Chat} options={({route})=>({
          title:route.params?.username
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
