import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
const LoadingOverlay = ({visible}) => {
  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </Modal>
  );
};
const SelectScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  // def
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [img, setImg] = useState(null);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setBase64Image(response.assets[0].base64);
        setSelectedImage({uri: response.assets[0].uri});
      }
    });
  };
  const openCamera = () => {
    const options = {
      mediaType: 'photo',
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log(
          'Camera Error: ',
          response.errorCode,
          ':',
          response.errorMessage,
        );
      } else {
        console.log(response.assets[0].base64);
        setSelectedImage({uri: response.assets[0].uri});
      }
    });
  };

  const sendImageToServer = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://detect.roboflow.com/detection-of-melanoma/3',
        base64Image,
        {
          params: {
            api_key: 'Y7xrXlmhGlpxjHeseYAj',
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      const params = {
        image: base64Image,
        predictions: response.data.predictions,
        imageSize: response.data.image,
      };
      console.log('response.data', response.data);
      setIsLoading(false);
      navigation.navigate('Viewer', {img: params});
    } catch (error) {
      setIsLoading(false);

      throw new Error(`Error sending image to server: ${error.message}`);
    }
  };
  const handleSubmit = () => {
    // Submit
    sendImageToServer();
    console.log('Submit button pressed');
  };
  return (
    <View style={styles.container}>
      <LoadingOverlay visible={isLoading} />
      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.buttonText}>Take a Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={openImagePicker}>
        <Text style={styles.buttonText}>Select a Photo</Text>
      </TouchableOpacity>
      {selectedImage && (
        <Image
          source={selectedImage}
          style={styles.selectedImage}
          resizeMode="contain"
        />
      )}
      {selectedImage && (
        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1d8c2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    marginVertical: 10,
    justifyContent: 'center',
  },
  submit: {
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    marginVertical: 10,
    justifyContent: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#666',
    textAlign: 'center',
  },
  selectedImage: {
    width: '80%',
    height: 300,
    marginTop: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default SelectScreen;
