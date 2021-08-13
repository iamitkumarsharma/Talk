import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import io from 'socket.io-client';
import DialogInput from 'react-native-dialog-input';
import Footer from './Footer';

const ChatSection = () => {
  const [roomId, setRoomId] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socketRef = useRef();
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
    socketRef.current = io.connect('http://192.168.0.104:5000');
    socketRef.current.on('room id', id => {
      setRoomId(id);
      console.log(id);
    });

    socketRef.current.on('message', msg => {
      receiveMsg(msg);
      console.log(msg, 'mmmmmmmmmmmmmm');
    });
  }, []);

  const receiveMsg = msg => {
    setMessages(prevMsg => [...prevMsg, msg]);
  };

  const sendMsg = () => {
    const messageObj = {
      body: message,
      date: new Date().toLocaleTimeString(),
      user: name,
      id: roomId,
    };
    setMessage('');
    socketRef.current.emit('send message', messageObj);
  };

  console.log(name, 'nnnnn');

  return (
    <View style={{backgroundColor: 'gray', height: '100%'}}>
      {/* <TextInput
        style={styles.input}
        onChangeText={msg => setMessage(msg)}
        value={message}
        placeholder="Enter Text.."
        keyboardType="numeric"
        onSubmitEditing={sendMsg}
      /> */}
      <DialogInput
        isDialogVisible={open}
        title={'Enter Name'}
        message={'Enter Your Full Name'}
        hintInput={'Enter Name'}
        submitInput={inputText => {
          setName(inputText);
          setOpen(false);
        }}
        closeDialog={() => {
          setOpen(false);
        }}></DialogInput>
      {messages.map((msg, index) => (
        <Text key={index}>{msg.user + ':' + msg.body}</Text>
      ))}
      <Footer setMessage={setMessage} sendMsg={sendMsg} message={message} />
    </View>
  );
};

export default ChatSection;

const styles = StyleSheet.create({});
