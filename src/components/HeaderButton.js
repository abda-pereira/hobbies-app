import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function HeaderButton({ go,  source, position = 'left'}) {
  return (
    <TouchableOpacity onPress={go} style={[styles.container, position === 'left' ? {left: 20} : {right: 20}]}>
      <Image
        style={styles.image}
        source={source}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30 + getStatusBarHeight(),
    zIndex:10
  },
  image: {
    width: 24,
    height: 24,
  },
})
