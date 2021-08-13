import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

const Footer = ({message, setMessage, sendMsg}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={{
          zIndex: 1,
          height: '50%',
          width: '85%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderBottomRightRadius: 20,
          borderTopRightRadius: 20,
          marginTop: 'auto',
          marginBottom: 'auto',
          fontSize: 15,
        }}
        onChangeText={msg => setMessage(msg)}
        value={message}
        placeholder="Enter Text.."
        keyboardType="numeric"
        onSubmitEditing={sendMsg}
      />
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1976d2',
    height: 100,
    alignItems: 'flex-start',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
