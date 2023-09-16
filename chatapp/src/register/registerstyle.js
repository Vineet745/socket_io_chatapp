import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { horizontalScale, moderateScale, verticalScale } from '../assets/Dimension'

export default registerStyle = StyleSheet.create({
    registerView:{
      flex:1,
      alignItems:"center",
      justifyContent:"center",
      borderColor:"black",
    },
    outertext:{
        color:"black",
        fontSize:moderateScale(45),
        fontStyle:"italic",
        alignSelf:"center"
    },
    container:{
        backgroundColor:"white",
        height:verticalScale(450),
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        padding:30

    },
    inputbox:{
        width:"90%",
        borderWidth:1,
        padding:moderateScale(10),
        margin:moderateScale(20),
        borderRadius:moderateScale(20),
        fontSize:moderateScale(20),
        marginTop:verticalScale(8),
        color:"black"
    },
    buttontouchable:{
            backgroundColor:"#8948f7",
            padding:moderateScale(15),
            borderRadius:moderateScale(20),
            width:horizontalScale(280),
            alignSelf:"center",
            marginTop:20
    }
    
})
  

