import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import history from './history';
import {useNavigation} from '@react-navigation/native';

const generateRandomDate = (i: number) => {
  const startDate = new Date();
  const randomInterval =
    Math.floor(i * 6 * 60 * 60 * 1000) + Math.random() * 6 * 60 * 60 * 1000;
  const randomDate = new Date(startDate.getTime() - randomInterval);
  const dd = String(randomDate.getDate()).padStart(2, '0');
  const mm = String(randomDate.getMonth() + 1).padStart(2, '0');
  const yyyy = randomDate.getFullYear();
  const hours = String(randomDate.getHours()).padStart(2, '0');
  const minutes = String(randomDate.getMinutes()).padStart(2, '0');

  return `${dd}/${mm}/${yyyy} ${hours}:${minutes}`;
};

const listData = () => {
  const historyArr = [];
  historyArr.push(history.report_1);
  historyArr.push(history.report_2);

  return historyArr;
};

const generateData = () => {
  let data = [];
  for (let i = 0; i < 20; i++) {
    data.push({id: i.toString(), content: generateRandomDate(i)});
  }

  return data;
};

const Item = ({content, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.itemText}>{content}</Text>
  </TouchableOpacity>
);

const ScrollableList = () => {
  const navigation = useNavigation();
  const handleItemPress = (id: Number, title: String) => {
    navigation.navigate('Viewer', {img: listData()[id], title: title});
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {generateData().map(item => (
        <Item
          key={item.id}
          content={item.content}
          onPress={() => handleItemPress(item.id, item.content)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d1d8c2',
    padding: 20,
  },
  item: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    marginVertical: 10,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  itemText: {
    color: '#666',
  },
});

export default ScrollableList;
