import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Appbar, Title } from 'react-native-paper'
import FastImage from 'react-native-fast-image'

function Header({ avatar, titleText }) {
  return (
    <Appbar.Header style={styles.headerContainer}>
      <View style={styles.container}>
        {avatar &&
          <FastImage
            style={styles.avatar}
            source={{uri: avatar}}
            resizeMode={FastImage.resizeMode.contain}
          />
        }
        <Title style={styles.title}>{titleText}</Title>
      </View>
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#60DBC5'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    color: '#2E7166'
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10
  }
})

export default Header
