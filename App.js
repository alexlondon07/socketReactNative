import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  FlatList,
  Image,
  Button,
  Alert
} from 'react-native';
import Header from './header';
import io from 'socket.io-client';

const NAME = '@alexlondon07';
const CHANNEL = 'Chat Etn';
const AVATAR = "https://pbs.twimg.com/profile_images/1036339037232144384/coUeIfX7_bigger.jpg";

export default class App extends Component {
  state = {
    typing: '',
    messages: [],
    showModal: true,
    nickname: ''
  };

  componentWillMount() {
    this.socket = io.connect('http://chatroomrn.us.openode.io:80')
  }

  renderItem({ item }) {
    return (
      <View style={styles.row}>
        <Image style={styles.avatar} source={{ uri: item.avatar }} />
        <View style={styles.rowText}>
          <Text style={styles.sender}>{ item.username }</Text>
          <Text style={styles.message}>{ item.message }</Text>
        </View>
      </View>
    );
  }

  sendMessage = () => {
   /* this.setState({
      messages: [...this.state.messages, { nickname: NAME, avatar: AVATAR, message: this.state.typing }]
    })*/
    this.socket.emit('new_message', { message: this.state.typing })
    this.setState({
      typing: ''
    })
  }

  componentDidMount = () => {
    this.listenMessages();
  }
  listenMessages(){
    this.socket.on('new_message', ( data ) => {
      let newMessage = {
        avatar: data.avatar,
        username: data.username,
        message: data.message
      }
      this.setState({
        messages: [...this.state.messages, newMessage ]
      })
    });
  }

  keyExtractor = () => Math.floor((Math.random() * 1000) + 1).toString();

  enterRoom = () => {
    this.socket.emit('change_username', { username: this.state.nickname, avatar: AVATAR } )
    this.setState({ showModal: false })
  }
  renderModal (){
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={ this.state.showModal }
        onRequestClose={ () => { Alert.alert('Modal has been closed.') } }>
        <View style={ styles.modalContainer }>
            <TextInput
              style={styles.inputNickname}
              placeholder="@nickname"
              onChangeText={text => this.setState({ nickname: text })}
            />
            <Button
              title="Ingresar al chat :D"
              onPress={ this.enterRoom }
            />
        </View>
      </Modal>
    )
  }

  render() {
    return (
      <View style={styles.container}>
      { this.renderModal() }
      <Header title={CHANNEL} />
        <FlatList
          data={this.state.messages}
          renderItem={this.renderItem}
          //inverted
          keyExtractor={this.keyExtractor}
        />
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.footer}>
            <TextInput
              value={this.state.typing}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Type something nice"
              onChangeText={text => this.setState({ typing: text })}
              onSubmitEditing = { this.sendMessage }
            />
            <TouchableOpacity onPress={ this.sendMessage }>
              <Text style={styles.send}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputNickname: {

  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  row: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  avatar: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10
  },
  rowText: {
    flex: 1
  },
  message: {
    fontSize: 18
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
  },
  input: {
    paddingHorizontal: 20,
    fontSize: 18,
    flex: 1,
    color: '#0055aa',
  },
  send: {
    alignSelf: 'center',
    color: '#0055aa',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20
  },
  modalContainer:{
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  inputNickname:{
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  }
});