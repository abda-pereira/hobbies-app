import React, {useState} from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import HeaderButton from '../components/HeaderButton';
import { emailValidator } from '../validations/emailValidator';
import firebase from '../util/firebase';

export default function ResetPassword({navigation}) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const auth = firebase.auth();

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    auth.sendPasswordResetEmail(email.value).then(function() {
      // Email sent.
      navigation.navigate('Login')
    }).catch(function(error) {
      // An error happened.
    });
  }

  return (
    <Background>
      <HeaderButton go={navigation.goBack} source={require('../assets/arrow_back.png')} />
      <Header>Restore Password  </Header>
      <TextInput
        label="Email"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive email with password reset link."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Send Instructions
      </Button>
    </Background>
  )
}
