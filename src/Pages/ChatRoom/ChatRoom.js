import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, FlatList, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../styles/colors';

import styles from './ChatRoom.style';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import parseContentData from '../../utils/parseContentData';

import ContentInputModal from '../../Components/modal/ContentInput/ContentInputModal';
import FloatingButton from '../../Components/FloatingButton/FloatingButton';
import MessageCard from '../../Components/MessageCard/MessageCard';

const ChatRoom = ({route, navigation}) => {
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    database()
      .ref(`/rooms/${route.params.item.id}/messages/`)
      .on('value', snapshot => {
        const contentData = snapshot.val();
        const parsedData = parseContentData(contentData || {});
        setMessages(parsedData);
      });
  }, []);

  function handleInputToggle() {
    setInputModalVisible(!inputModalVisible);
  }
  function handleSendContent(messageContent) {
    handleInputToggle();
    sendContent(messageContent);
  }
  function sendContent(messageContent) {
    const userMail = auth().currentUser.email;
    const message = {
      text: messageContent,
      username: userMail.split('@')[0],
      date: new Date().toISOString(),
    };
    try {
      database().ref(`/rooms/${route.params.item.id}/messages/`).push(message);
    } catch (error) {
      console.log(error);
    }
  }

  const renderMessages = ({item}) => <MessageCard message={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.header_title}>{route.params.item.text}</Text>
        <View style={styles.header_icon}>
          <Icon
            name="undo"
            size={30}
            color={colors.darkgreen}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
      <FlatList
        data={messages}
        renderItem={renderMessages}
        keyExtractor={(item, index) => index.toString()}
      />
      <FloatingButton icon="add" onPress={handleInputToggle} />
      <ContentInputModal
        visible={inputModalVisible}
        onClose={handleInputToggle}
        onSend={handleSendContent}
        placeholder={'Mesajınız..'}
      />
    </SafeAreaView>
  );
};

export default ChatRoom;
