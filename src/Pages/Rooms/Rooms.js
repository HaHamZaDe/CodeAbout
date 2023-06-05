import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, FlatList, Alert, View} from 'react-native';
import FloatingButton from '../../Components/FloatingButton/FloatingButton';
import styles from './Rooms.style';
import ContentInputModal from '../../Components/modal/ContentInput/ContentInputModal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../styles/colors';

import RoomCard from '../../Components/RoomCard/RoomCard';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import parseContentData from '../../utils/parseContentData';

const Rooms = ({navigation}) => {
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    database()
      .ref('rooms/')
      .on('value', snapshot => {
        const contentData = snapshot.val();

        const parsedData = parseContentData(contentData || {});
        const sortedData = parsedData.sort((a, b) =>
          a.text.localeCompare(b.text),
        ); // İsmine göre sıralama
        setRoomList(sortedData);
      });
  }, []);

  function handleInputToggle() {
    setInputModalVisible(!inputModalVisible);
  }
  function handleSendContent(roomTitle) {
    handleInputToggle();

    sendContent(roomTitle);
  }
  function sendContent(roomTitle) {
    const userMail = auth().currentUser.email;
    const contentObject = {
      text: roomTitle,
      username: userMail.split('@')[0],
      date: new Date().toISOString(),
      creatorUid: auth().currentUser.uid,
    };
    database().ref('rooms/').push(contentObject);
  }
  const handleRooms = item => {
    navigation.navigate('RoomsChatScreen', {item});
  };

  const handleRoomDelete = roomId => {
    database().ref(`rooms/${roomId}`).remove();
  };

  const renderContent = ({item}) => (
    <RoomCard
      roomName={item.text}
      onMessages={() => handleRooms(item)}
      onDeletePress={() => handleRoomDelete(item.id)}
      creatorUid={item.creatorUid}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.header_title}>Odalar</Text>
        <View style={styles.header_icon}>
          <Icon
            name="logout"
            size={30}
            color={colors.darkgreen}
            onPress={() => auth().signOut()}
          />
        </View>
      </View>
      <FlatList
        data={roomList}
        renderItem={renderContent}
        numColumns="2"
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
      <FloatingButton icon="add" onPress={handleInputToggle} />
      <ContentInputModal
        visible={inputModalVisible}
        onClose={handleInputToggle}
        onSend={handleSendContent}
        placeholder={'Oda Adı'}
      />
    </SafeAreaView>
  );
};

export default Rooms;
