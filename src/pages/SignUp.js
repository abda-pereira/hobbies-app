import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View, LogBox} from 'react-native'
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { emailValidator } from '../validations/emailValidator';
import { passwordValidator } from '../validations/passwordValidator';
import { theme } from '../core/theme';
import firebase from '../util/firebase';

export default function SignUp({navigation}) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const auth = firebase.auth();
  const database = firebase.database();

  const onSignUpPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    auth.createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredencial) => {
      let user = userCredencial.user
      if (LogBox) LogBox.ignoreLogs(['Setting a timer']);
      let newUser = { email: user.email, created: new Date().toString(), uid: user.uid };
      database.ref('users/' + user.uid).set(newUser);
      navigation.reset({ index: 0, routes: [{ name: 'UserForm', params:  { user: newUser}}]})
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        setEmail({value: email.value, error: 'That email address is already in use!'})
      }
      if (error.code === 'auth/invalid-email') {
        setEmail({value: email.value, error: 'That email address is invalid!'})
      }
      console.error(error);
    });
  }

  return(
    <Background>
      <Header>Welcome back </Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.rowBottom}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  rowBottom: {
    flexDirection: 'row',
    marginTop: 4,
    backgroundColor: '#ffffff80',
    paddingHorizontal: 20,
    paddingVertical: 5,
    justifyContent: 'center',
    borderRadius: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.text
  },
})
