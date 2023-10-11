import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    // 在这里执行登录逻辑，然后跳转到主页
    navigation.navigate('Home');
  };
  return (
    <ImageBackground source={require('./bg.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.appName}>
          <Text>Melanoma</Text>
          {'\n'}
          <Text>Master</Text>
        </Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View>
            <View style={styles.inputForm}>
              <TextInput style={styles.inputField} placeholder="Email" />
              <TextInput
                style={styles.inputField}
                placeholder="Password"
                secureTextEntry={true}
              />
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}>
                <Text style={styles.buttonText}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 50,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputForm: {
    marginTop: 100,
  },
  inputField: {
    height: 50,
    width: 300,
    borderRadius: 25,
    padding: 10,
    marginVertical: 10,
    paddingHorizontal: 20,
    color: '#666',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  loginButton: {
    height: 50,
    width: 300,
    borderRadius: 25,
    padding: 10,
    marginTop: 10,
    backgroundColor: 'rgba(51, 51, 51, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default LoginScreen;
