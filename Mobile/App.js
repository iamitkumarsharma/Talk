import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import MaterialHeader1 from './components/MaterialHeader1';
import MaterialFixedLabelTextbox from './components/MaterialFixedLabelTextbox';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import io from 'socket.io-client';

function App(props) {
  const [roomId, setRoomId] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socketRef = useRef();
  const [name, setName] = useState('');
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [emojiDialog, setEmojiDialog] = useState(false);
  const listRef = useRef();

  useEffect(() => {
    // getUser();
    //setOpen(true);
    socketRef.current = io.connect('http://192.168.0.107:5000');
    socketRef.current.on('room id', id => {
      setRoomId(id);
      console.log(id);
    });

    socketRef.current.on('message', msg => {
      receiveMsg(msg);
    });
  }, []);

  function receiveMsg(msg) {
    setMessages(prevMsg => [...prevMsg, msg]);
  }
  function sendMessage(e) {
    e.preventDefault();
    const messageObj = {
      body: message,
      date: new Date().toLocaleTimeString(),
      user: name,
      id: roomId,
    };
    setMessage('');
    socketRef.current.emit('send message', messageObj);
  }

  // const getUser = async () => {
  //   setLoading(true);
  //   let user = await localStorage.getItem('sender');
  //   if (user) {
  //     setName(user);
  //     setLoading(false);
  //   } else {
  //     setName();
  //     setLoading(false);
  //   }
  // };
  console.log(messages, 'ppppp');
  return (
    <View style={styles.container}>
      <View style={styles.rect4Stack}>
        <View style={styles.rect4}>
          <Image
            style={styles.bimage}
            source={require('./assets/image/background.png')}
          />
          <View style={styles.materialHeader1}>
            <Text style={{color: 'white', fontSize: 40, marginLeft: 10}}>
              Talk
            </Text>
          </View>
          <View style={styles.scrollArea}>
            <ScrollView
              horizontal={false}
              contentContainerStyle={styles.scrollArea_contentContainerStyle}>
              <FlatList
                ref={listRef}
                onContentSizeChange={() => listRef.current.scrollToEnd()}
                onLayout={() => listRef.current.scrollToEnd()}
                data={messages}
                keyExtractor={(message, index) => index.toString()}
                renderItem={({m, i}) =>
                  // message && message.id === roomId ? (
                  //   <View style={styles.rect2} key={index}>
                  //     <Text style={styles.loremIpsum}>{message.body}</Text>
                  //   </View>
                  // ) : (
                  //   <View style={styles.rect3}>
                  //     <Text style={styles.loremIpsum1}>{message.body}</Text>
                  //   </View>
                  // )
                  console.log(m, 'kkkkkkkkkkk')
                }
              />
            </ScrollView>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerView}>
            <View style={styles.materialFixedLabelTextboxStack}>
              <TextInput
                style={styles.materialFixedLabelTextbox}
                onChangeText={text => setMessage(text)}
                value={message}></TextInput>
              <IoniconsIcon
                onPress={sendMessage}
                name="md-send"
                style={styles.icon}></IoniconsIcon>
              <EntypoIcon name="emoji-flirt" style={styles.icon2}></EntypoIcon>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  rect4: {
    top: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,1)',
    right: 0,
    bottom: 9,
  },
  materialHeader1: {
    height: 66,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'blue',
  },
  scrollArea: {
    top: 80,
    left: 0,
    opacity: 0.8,
    height: 581,
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,1)',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.04,
    shadowRadius: 0,
    right: 0,
  },
  scrollArea_contentContainerStyle: {
    height: 581,
  },
  rect2: {
    height: 47,
    backgroundColor: 'rgba(11,25,246,1)',
    borderRadius: 21,
    overflow: 'hidden',
    width: 144,
    marginTop: 95,
    marginLeft: 205,
    opacity: 1,
    zIndex: 5,
  },
  loremIpsum: {
    fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 18,
    marginTop: 13,
    marginLeft: 21,
  },
  rect3: {
    height: 47,
    backgroundColor: 'rgba(195,197,238,1)',
    borderRadius: 21,
    overflow: 'hidden',
    width: 144,
    marginTop: 12,
    marginLeft: 10,
  },
  loremIpsum1: {
    fontFamily: 'roboto-regular',
    color: 'rgba(12,5,5,1)',
    fontSize: 18,
    marginTop: 12,
    marginLeft: 19,
  },
  materialHeader1Stack: {
    height: 636,
    marginTop: 22,
  },
  footer: {
    left: 0,
    height: 91,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  footerView: {
    backgroundColor: 'rgba(113,88,209,1)',
    flex: 1,
  },
  materialFixedLabelTextbox: {
    height: 62,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 35,
    right: 0,
  },
  icon: {
    top: 9,
    right: 10,
    position: 'absolute',
    color: 'rgba(42,45,69,1)',
    fontSize: 41,
    height: 45,
    width: 33,
  },
  icon2: {
    top: 15,
    left: 10,
    position: 'absolute',
    color: 'rgba(74,74,74,1)',
    fontSize: 30,
    height: 33,
    width: 30,
  },
  materialFixedLabelTextboxStack: {
    height: 62,
    marginTop: 12,
  },
  rect4Stack: {
    flex: 1,
    marginBottom: -9,
  },
  bimage: {
    height: '100%',
    width: '100%',
    zIndex: -4,
  },
});

export default App;
