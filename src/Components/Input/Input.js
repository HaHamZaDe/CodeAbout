import React from 'react';
import {View, TextInput, Text} from 'react-native';
import {showMessage} from 'react-native-flash-message';

import styles from './Input.style';

const Input = ({value, placeholder, onType, isSecure, error}) => {
  const showError = errorMsg => {
    showMessage({
      message: errorMsg,
      type: 'danger',
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        onChangeText={onType}
        placeholder={placeholder}
        value={value}
        placeholderTextColor="white"
        style={styles.txtinput}
        secureTextEntry={isSecure}
        onFocus={() => error && showError(error)}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default Input;
