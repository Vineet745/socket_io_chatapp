import { View, Text,ImageBackground } from 'react-native'
import React, { Children } from 'react'

const Background = ({children}) => {
  return (
    <View>
        <ImageBackground source={require('../src/assets/bg3.jpg')} style={{height:"100%"}}>
            {children}
        </ImageBackground>
    </View>
  )
}

export default Background