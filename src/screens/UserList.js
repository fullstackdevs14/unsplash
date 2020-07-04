import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import { useSelector, useDispatch } from 'react-redux'
import { debounce } from 'lodash'
import { getUsers } from '../redux/root'

import Header from '../components/Header'

const UserList = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  const search = text => {
    setKeyword(text)
    dispatch(getUsers(text))
  }

  const handleSearch = debounce(query => search(query), 500)

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('UserDetail', { user: item })}>
      <View style={styles.itemContainer}>
        <FastImage
          style={styles.avatar}
          source={{uri: item.profile_image.medium}}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text category='s1'>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  )

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TextInput
        onChangeText={handleSearch}
        placeholder='Search users'
        style={styles.searchBar}
        value={keyword}
      />
    </View>
  )

  const renderSeparator = () => (
    <View style={styles.separator} />
  )

  const renderFooter = () => {
    if (!loading) return null
    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator animating size='large' />
      </View>
    )
  }

  return (
    <>
      <Header titleText='Unsplash Demo' />
      <View style={styles.container}>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={renderSeparator}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  headerContainer: {
    marginBottom: 20
  },
  searchBar: {
    borderColor: '#333',
    backgroundColor: '#fff'
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center'
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10
  },
  separator: {
    height: 1,
    width: '95%',
    backgroundColor: '#CED0CE',
  },
  footerContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE'
  }
})

export default UserList
