import React from 'react';
import {View, Text, TouchableWithoutFeedback, Alert} from 'react-native';
import styles from './RoomCard.style';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

const RoomCard = ({roomName, onMessages, onDeletePress, creatorUid}) => {
  const currentUserUid = auth().currentUser.uid;

  const handleDelete = () => {
    if (creatorUid === currentUserUid) {
      Alert.alert(
        'Uyarı',
        'Bu odayı silmek istediğinize emin misiniz?',
        [
          {
            text: 'Evet',
            onPress: () => onDeletePress(),
          },
          {
            text: 'Hayır',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    } else {
      showMessage({
        message: 'Bu odayı sadece oluşturan kullanıcı silebilir.',
        type: 'warning',
        floating: true,
        position: 'top',
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onMessages} onLongPress={handleDelete}>
      <View style={styles.container}>
        <Text style={styles.roomName}>{roomName}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RoomCard;
