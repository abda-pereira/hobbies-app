import React, {useEffect, useState} from 'react';
import {LogBox, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Text} from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import {emailValidator,} from '../validations/emailValidator';
import {passwordValidator} from '../validations/passwordValidator';
import {userValidator} from '../validations/userValidator';
import {theme} from '../core/theme';
import firebase from '../util/firebase';
import NetInfo from '@react-native-community/netinfo';

export default function Login({navigation}) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const auth = firebase.auth();
  const database = firebase.database();
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    auth.signInWithEmailAndPassword(email.value, password.value)
    .catch(error => {
      if (error.code === 'auth/invalid-email') {
        setEmail({value: email.value, error: 'That email address is invalid'})
      }
      if (error.code === 'auth/wrong-password') {
        setPassword({value: password.value, error: 'The password is invalid'})
      }
      if (error.code === 'auth/user-not-found') {
        setEmail({value: email.value, error: 'There is no user record corresponding to this email/password'})
      }
      console.error(error);
    });

  }

  // Handle user state changes
  const onAuthStateChanged = async (userLocal) => {
    if (userLocal != null) {
      if (LogBox) LogBox.ignoreLogs(['Setting a timer']);
      let starCountRef = await database.ref('users/' + userLocal.uid);
      await starCountRef.on('value', (snapshot) => {
        let user = snapshot.val() || {};
        user.uid = user?.uid || userLocal?.uid;
        navigation.reset({
          index: 0,
          routes: [{ name: userValidator(user), params:  { user } }],
        })
      });
    } else {
      if (initializing) setInitializing(false);
    }
  }

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        // Listen for authentication state to change.
        return auth.onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
      } else {
        setInitializing(false)
      }
    });
  }, []);

  if (initializing) return null;

  return(
    <Background backImage={true}>
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPassword')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.rowBottom}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>

    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
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
  forgot: {
    fontSize: 13,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.text
  },
})
