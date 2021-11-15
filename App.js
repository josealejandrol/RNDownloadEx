import React from 'react';
import {SafeAreaView, View, Image, Button, Text, Platform} from 'react-native';
import RNBlobUtil from 'react-native-blob-util';
import FastImage from 'react-native-fast-image';

const uriImage =
  'https://www.techup.co.in/wp-content/uploads/2020/01/techup_logo_72-scaled.jpg';

const urlPdf = 'https://api.brain-gbuniversity.com/documents/Competencias.pdf';

const downloadFile = () => {
  const {config, fs} = RNBlobUtil;

  config({
    fileCache: true,
    path: `${fs.dirs.DownloadDir}/ImagenRandom.jpg`,
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

const handleDownloadFile = async () => {
  const DIRS = RNBlobUtil.fs.dirs;

  const filename = 'Competencias.pdf';
  const FileManager = Platform.select({
    ios: {
      getDownloadPath: filename => `${DIRS.CacheDir}/${filename}`,
      preview: path => RNBlobUtil.ios.openDocument(path),
    },
    android: {
      getDownloadPath: filename => `${DIRS.DownloadDir}/${filename}`,
      preview: RNBlobUtil.android.actionViewIntent,
    },
  });

  const path = FileManager.getDownloadPath(filename);

  try {
    const fetchConfig = {
      fileCache: true,
      path,
      appendExt: filename.split('.').slice(-1)[0],
      addAndroidDownloads: {
        title: filename,
        path,
        notification: true,
        useDownloadManager: true,
        mediaScannable: true,
      },
    };

    this.currentTask = RNBlobUtil.config(fetchConfig).fetch('GET', urlPdf);

    const response = await this.currentTask;
    const downloadPath = response.path();
    console.log('Path: ', downloadPath);
    FileManager.preview(downloadPath);
    this.currentTask = null;
  } catch (error) {
    this.currentTask = null;
  }
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
        <Button title="Download image" onPress={handleDownloadFile} />
      </View>
    </SafeAreaView>
  );
};

export default App;
