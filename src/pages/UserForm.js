import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, LogBox, FlatList} from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import TextInput from "../components/TextInput";
import * as ImagePicker from "expo-image-picker";
import * as Location from 'expo-location';
import {theme} from '../core/theme';
import Button from '../components/Button';
import config from "../util/config";
import firebase from "../util/firebase";
import HeaderButton from "../components/HeaderButton";
import {nameValidator} from "../validations/nameValidator";
import {ageValidator} from "../validations/ageValidator";

export default function UserForm({navigation, route}) {
  const {user, edit} = route.params;
  const database = firebase.database();
  const auth = firebase.auth();
  const [name, setName] = useState({ value: user?.name || '', error: '' });
  const [age, setAge] = useState({ value: user?.age || '', error: '' });
  const [photo, setPhoto] = useState({ value: user?.photo || '', error: '' });
  const [hobbies, setHobbies] = useState({ value: user?.hobbies || [], error: '' });
  const [location, setLocation] = useState({ value: user?.location || {}, error: '' });
  const [address, setAddress] = useState({ value: user?.address || '', error: '' });

  const onSave = async () => {
    const nameError = nameValidator(name.value)
    const ageError = ageValidator(age.value)
    if (nameError || ageError) {
      setName({ ...name, error: nameError })
      setAge({ ...age, error: ageError })
      return
    }
    if (LogBox) LogBox.ignoreLogs(['Setting a timer']);
    await database.ref('users/' + user.uid).set({
      ...user, ...{
        name: name?.value,
        age: age?.value,
        photo: photo?.value,
        hobbies: hobbies?.value,
        location: location?.value,
        address: address?.value,
        uid: user?.uid,
        update: new Date().toString()
      }
    });
  }

  const setHobbiesCheck = (id) => {
    if (hobbies.value.includes(id)) {
      hobbies.value = hobbies.value.filter(obj => obj !== id);
    } else {
      hobbies.value.push(id)
    }
    setHobbies({value: hobbies.value, error: ''})
  }

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setLocation({error: 'Permission to access location was denied'});
      return;
    }
    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      for (let item of response) {
        item.city_subregion = item.city || item.subregion
        setAddress({value: item, error: ''})
      }
      setLocation({value: { latitude: coords.latitude, longitude: coords.longitude }, error: ''})
    }
  }


  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: false,
      aspect: [4, 3],
    });
    if (pickerResult.cancelled === true) {
      return;
    }
    setPhoto({ value: `data:image/jpg;base64,${pickerResult.base64}`, error: '' });
  };

  const signOut = () => {
    auth.signOut().then(() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] }) )
    .catch((error) => {
      // An error happened.
    });
  }
  let extraData = new Date();
  useEffect(() => {
    extraData = new Date();
  },[hobbies])

  return(
    <ScrollView>
      <Background backImage={false}>
        {edit ? <HeaderButton go={navigation.goBack} source={require('../assets/arrow_back.png')} /> :
          <HeaderButton go={signOut} position="right" source={require('../assets/off.png')} />}
        <Header topHeader={true} />
        <View style={{"alignItems": "center"}}>

          <View style={[theme.containerUserImage, {top: -45, marginBottom: -45}]} >
            <Image
              style={!photo.value ? theme.userImage : theme.userImageSelected}
              source={photo.value ? {uri: photo.value} : require('../assets/user.png')} />
            <TouchableOpacity onPress={openImagePickerAsync} style={styles.containerPhotoImage}>
              <Image style={styles.photoImage} source={require('../assets/photo.png')}/>
            </TouchableOpacity>
          </View>

          <View style={theme.container}>
            <TextInput
              label="Name"
              returnKeyType="next"
              value={name.value}
              onChangeText={(text) => setName({ value: text, error: '' })}
              error={!!name.error}
              errorText={name.error}
              autoCapitalize="none"
            />
            <TextInput
              label="Age"
              returnKeyType="next"
              keyboardType="numeric"
              value={age.value}
              onChangeText={(text) => setAge({ value: text, error: '' })}
              error={!!age.error}
              errorText={age.error}
            />
            <View style={theme.containerDiv}>
              <Text style={theme.titleDiv}>Location  </Text>
              <View style={theme.p20}>
                {address.value ? <View>
                  <Text>{config.addressLine(address.value, ['street', 'name'])}</Text>
                  <Text>{config.addressLine(address.value, ['district', 'city_subregion', 'region', 'isoCountryCode'], ' - ')}</Text>
                  <Text>{config.addressLine(address.value, ['postalCode'])}</Text>
                </View> : <Text style={{paddingVertical: 20, textAlign: "center"}}>Tap pick location to get your address  </Text>
                }
                <Button mode="contained" onPress={getLocation}>
                  Pick Location
                </Button>
              </View>
            </View>
            <View style={theme.containerDiv}>
              <Text style={theme.titleDiv}>Hobbies </Text>
              <View style={theme.pv10}>
                <FlatList data={config.hobbies || []}
                          numColumns={3}
                          keyExtractor={item => item.id}
                          extraData={extraData}
                          renderItem={({ item }) => {
                            return (
                              <View key={item.id} style={theme.hobby.container}>
                                <TouchableOpacity style={theme.hobby.div} onPress={() => setHobbiesCheck(item.id)}>
                                  <Image style={theme.hobby.img} source={item.src} />
                                  {hobbies.value.includes(item.id) ?
                                    <View style={theme.hobby.check.div} onPress={() => setHobbiesCheck(item.id)}>
                                      <Image style={theme.hobby.check.img} source={require('../assets/check.png')} />
                                    </View>
                                    :  null}
                                </TouchableOpacity>
                                <Text style={{ 'marginTop': 10, 'textAlign': 'center', 'fontSize': 11 }}>{item.title}</Text>
                              </View>
                            );
                          }}
                />
              </View>
            </View>
            <Button mode="contained" style={{marginTop: 30}} onPress={onSave}>
              Save
            </Button>
          </View>
        </View>

      </Background>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  containerPhotoImage: {
    position: 'absolute',
    top: 75,
    left: 65,
    backgroundColor: theme.colors.secondary,
    width: 40,
    height: 40,
    padding: 10,
    borderRadius: 50,
    zIndex: 2
  },
  photoImage: {
    width: 20,
    height: 20
  }
})
