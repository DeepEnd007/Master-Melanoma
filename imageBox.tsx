import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

const ImageWithBoundingBox = ({image, imageSize, predictions}) => {
  // 获取第一个预测
  console.log('predictions image', 'data:image/png;base64,' + image);
  const firstPrediction = predictions[0];
  const res = (firstPrediction.confidence * 100).toFixed(2) + '%';

  // 计算框的样式
  const boxStyle = {
    position: 'absolute',
    left: firstPrediction.x,
    top: firstPrediction.y,
    width: firstPrediction.width,
    height: firstPrediction.height,
    borderWidth: 2,
    borderColor: 'yellow',
    backgroundColor: 'transparent',
  };

  return (
    <View style={styles.imageContainer}>
      {/* 框 */}
      <Image
        source={{uri: 'data:image/jpg;base64,' + image}}
        style={styles.selectedImage}
        // style={{width: imageSize.width, height: imageSize.height}}
      />
      <Text style={styles.resText}>{res}</Text>
      {/* <View style={boxStyle} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 300,
  },
  selectedImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
  },
  resText: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    fontSize: 32,
    color: '#fff',
    padding: 5,
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontWeight: 'bold',
  },
});

export default ImageWithBoundingBox;
