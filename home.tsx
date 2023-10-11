import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName);
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.square}
          onPress={() => navigateToScreen('Select')}>
          <Text style={styles.squareText}>Select a Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.square}
          onPress={() => navigateToScreen('List')}>
          <Text style={styles.squareText}>Historical Report</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.square}
          onPress={() => navigateToScreen('Viewer')}>
          <Text style={styles.squareText}>Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square}>
          <Text style={styles.squareText}>Coming Soon</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.slogan}>Take care of your skin</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1d8c2',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -150,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  square: {
    width: 150,
    height: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    position: 'relative',
  },
  squareText: {
    color: '#666',
    position: 'absolute',
    fontSize: 14,
    right: 20,
    bottom: 20,
  },
  slogan: {
    position: 'absolute',
    bottom: 50,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#666',
  },
});

export default HomeScreen;
