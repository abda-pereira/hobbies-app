import React from 'react'
import {Dimensions, StyleSheet, View} from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '../core/theme';
import { LinearGradient } from 'expo-linear-gradient';

const window = Dimensions.get('window');

export default function Header(props) {
  if(props.topHeader) {
    return (
      <View style={styles.containerHeader}>
        <View style={styles.sliderContainerHeader}>
          <LinearGradient
            colors={['#0270ab', '#b9eff1']}
            style={styles.sliderHeader}
          />
        </View>
      </View>
    )
  }
  return <Text style={styles.header} {...props} />
}

const styles = StyleSheet.create({
  header: {
    fontSize: 34,
    color: theme.colors.text,
    paddingVertical: 12,
    fontFamily: 'vegan',
    marginBottom: 50
  },
  containerHeader: {
    alignSelf: 'center',
    width: window.width,
    overflow: 'hidden',
    height: 100
  },
  sliderContainerHeader: {
    borderRadius: window.width,
    width: window.width * 2,
    height: window.width * 2,
    marginLeft: -(window.width / 2),
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden'
  },
  sliderHeader: {
    height: window.width / 1.7,
    width: window.width,
    position: 'absolute',
    bottom: 0,
    marginLeft: window.width / 2,
  },
})
