import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, Dimensions, ActivityIndicator, TouchableOpacity, Modal } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from 'react-native-paper'
import FastImage from 'react-native-fast-image'
import ImageViewer from 'react-native-image-zoom-viewer'
import Header from '../components/Header'
import { getUserPhotos } from '../redux/root'

const BATCH_SIZE = 24;
const NUM_COLUMNS = 4;
const THUMBNAIL_WIDTH = Dimensions.get('window').width / NUM_COLUMNS - 6;

const UserDetail = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  const [modalVisible, setModalVisibility] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const photos = useSelector(state => state.userPhotos)
  const dispatch = useDispatch()
  const user = navigation.state.params.user

  useEffect(() => {
    dispatch(getUserPhotos(user.username))
  }, [])

  useEffect(() => {
    const images = photos.map((photo) => ({
      url: photo.urls.full,
      freeHeight: true
    }))
    setImages(images)
  }, [photos])

  const getItemLayout = (data, index) => ({
    length: THUMBNAIL_WIDTH,
    offset: THUMBNAIL_WIDTH * index,
    index,
  })

  const renderItem = ({ item, index }) => {
    const columnIndex = index % 4;
    return (
      <TouchableOpacity
        style={{ marginLeft: columnIndex > 0 ? 8 : 0 }}
        onPress={() => {
          setModalVisibility(true)
          setImageIndex(index)
        }}
      >
        <FastImage
          style={styles.photo}
          source={{uri: item.urls.full}}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
    );
  }

  const renderFooter = () => {
    if (!isLoading) return null;

    return (
      <ActivityIndicator
        style={{ marginVertical: 24 }}
        size="large"
      />
    );
  };

  const handleLoadMore = () => {}

  return (
    <>
      <Header titleText={user.name} avatar={user.profile_image.medium} />
      <IconButton
        icon='close'
        size={15}
        color='white'
        onPress={() => navigation.goBack()}
        style={styles.iconButton}
      />
      <View style={styles.container}>
        <FlatList
          data={photos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          getItemLayout={getItemLayout}
          maxToRenderPerBatch={BATCH_SIZE}
          windowSize={BATCH_SIZE}
          numColumns={NUM_COLUMNS}
          removeClippedSubviews
          columnWrapperStyle={{ marginBottom: 8 }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={1}
          ListFooterComponent={renderFooter}
        />
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisibility(false)}
      >
        <ImageViewer
          imageUrls={images}
          enableSwipeDown={true}
          index={imageIndex}
          onCancel={() => setModalVisibility(false)}
        />
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  iconButton: {
    backgroundColor: 'rgba(46, 113, 102, 0.8)',
    position: 'absolute',
    right: 0,
    top: 50,
    margin: 10
  },
  photo: {
    width: THUMBNAIL_WIDTH,
    height: THUMBNAIL_WIDTH
  }
})

export default UserDetail
