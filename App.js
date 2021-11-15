import React from 'react';
import {SafeAreaView, View, Image, Button, Text} from 'react-native';
import RNBlobUtil from 'react-native-blob-util';
import FastImage from 'react-native-fast-image';

const uriImage =
  'https://www.techup.co.in/wp-content/uploads/2020/01/techup_logo_72-scaled.jpg';

const downloadFile = () => {
  const {config, fs} = RNBlobUtil;

  config({
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: 'ImagenRandom.jpg',
      path: `${fs.dirs.DownloadDir}/ImagenRandom.jpg`,
    },
  })
    .fetch('GET', uriImage)
    .then(res => console.log('Respuesta: ', res))
    .catch(err => console.log('Error: ', err));
};

const App = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Example Download Image/File</Text>
        <Image
          source={{uri: uriImage}}
          style={{
            backgroundColor: 'red',
            height: 150,
            width: 250,
          }}
          resizeMode={'cover'}
        />
        <FastImage
          style={{width: 300, height: 200}}
          source={{
            uri: uriImage,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Button title="Download image" onPress={downloadFile} />
      </View>
    </SafeAreaView>
  );
};

export default App;
