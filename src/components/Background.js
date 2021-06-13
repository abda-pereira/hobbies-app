import React, {useEffect, useState} from 'react'
import {ImageBackground, StyleSheet, KeyboardAvoidingView, Platform, Dimensions, View, Text} from 'react-native';
import {theme} from '../core/theme';
import NetInfo from "@react-native-community/netinfo";
const screenHeight = Dimensions.get('window').height;
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";

export default function Background({ backImage = true, children }) {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected)
    });
  }, []);

  useEffect(() => {
    if (!isConnected) {
      showMessage({
        message: "Internet Connection Problem",
        description: "Please check your network connection",
        type: "danger",
        hideOnPress: false,
        autoHide: false,
        icon: { icon: "danger", position: "left" },
        style: {
          paddingTop: 30
        }
      });
    } else {
      hideMessage();
    }
  }, [isConnected]);

  if(!backImage){
    return (
        <View>
          <KeyboardAvoidingView style={styles.backgroundWhite}
                                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
              {children}
          </KeyboardAvoidingView>
          <FlashMessage position="top" />
        </View>
    )
  }
  return (
      <ImageBackground source={require('../assets/background.jpg')} style={styles.background} >
        <KeyboardAvoidingView style={theme.container}
                              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {children}
        </KeyboardAvoidingView>
        <FlashMessage position="top" />
      </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundWhite:{
    backgroundColor: theme.colors.surface,
    minHeight: screenHeight
  },
  background: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
    justifyContent: "center"
  }
})
