import React, {useEffect} from 'react';
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './src/core/theme';
import * as Font from 'expo-font';
import {Login, SignUp, ResetPassword, Dashboard, UserForm} from './src/pages';

export default function App() {
  const Stack = createStackNavigator();

  useEffect(() => {
    Font.loadAsync({
      'vegan': require('./src/assets/fonts/vegan.ttf')
    })
  },[])

  return (
      <Provider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="UserForm" component={UserForm} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
  );
}
