import React from 'react';
import {FlatList, Image, Text,  View, ScrollView} from 'react-native';
import Background from '../components/Background';
import firebase from "../util/firebase";
import Header from '../components/Header';
import {theme} from '../core/theme';
import HeaderButton from "../components/HeaderButton";
import config from "../util/config";

export default function Dashboard({navigation, route}) {
  const user = route.params.user;
  const auth = firebase.auth();

  const signOut = () => {
    auth.signOut().then(() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] }) )
    .catch((error) => {
      // An error happened.
    });
  }

  const edit = () => {
    navigation.navigate('UserForm',{ user, edit: true })
  }
  return(
    <ScrollView>
      <Background backImage={false}>
        <HeaderButton go={edit} source={require('../assets/edit.png')} />
        <HeaderButton go={signOut} position="right" source={require('../assets/off.png')} />
        <Header topHeader={true} />
        <View style={{"alignItems": "center"}}>
          <View style={[theme.containerUserImage, {top: -45, marginBottom: -45}]} >

            <Image
              style={[!user.photo ? theme.userImage : theme.userImageSelected]}
              source={user.photo ? {uri: user.photo} : require('../assets/user.png')} />
          </View>

          <View style={theme.container}>
            <Text style={{ 'fontSize': 18, 'fontWeight': 'bold', 'textAlign': 'center' }}>{user.name}</Text>
            <Text style={{ 'marginTop': 10 }}>Age: {user.age}</Text>
            {user.address  ?
              <View style={theme.containerDiv}>
                <Text style={theme.titleDiv}>Location  </Text>
                <View style={theme.p20}>
                  <View>
                    <Text>{config.addressLine(user.address, ['street', 'name'])}</Text>
                    <Text>{config.addressLine(user.address, ['district', 'city_subregion', 'region', 'isoCountryCode'], ' - ')}</Text>
                    <Text>{config.addressLine(user.address, ['postalCode'])}</Text>
                  </View>
                </View>
              </View> : null }

            {(user.hobbies || []).length ?
              <View style={theme.containerDiv}>
                <Text style={theme.titleDiv}>Hobbies </Text>
                <View style={theme.pv10}>
                  <FlatList data={(config.hobbies || []).filter(hobby => (user.hobbies || []).includes(hobby.id))}
                            numColumns={3}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                              return (
                                <View key={item.id} style={theme.hobby.container}>
                                  <View style={theme.hobby.div}>
                                    <Image style={theme.hobby.img} source={item.src} />
                                  </View>
                                  <Text style={{ 'marginTop': 10, 'textAlign': 'center', 'fontSize': 12 }}>{item.title}</Text>
                                </View>
                              );
                            }}
                  />
                </View>
              </View> : null}
          </View>
        </View>
      </Background>
    </ScrollView>

  )
}
