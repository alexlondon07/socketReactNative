import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  FlatList,
  Image
} from 'react-native';
import Header from './header';


const NAME = '@realDonaldTrump';
const CHANNEL = 'Random';
const AVATAR = "https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg";

export default class App extends Component {
  state = {
    typing: '',
    messages: []
  };

  componentWillMount() {
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
    console.log('hola');
    this.setState({
      messages: [...this.state.messages, { username: NAME, avatar: AVATAR, message: this.state.typing }]
    })
    this.setState({
      typing: ''
    })
    console.log('messages', this.state.messages);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.messages}
          renderItem={this.renderItem}
          inverted
        />
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.footer}>
            <TextInput
              value={this.state.typing}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Type something nice"
              onChangeText={text => this.setState({ typing: text })}
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
    backgroundColor: '#eee'
  },
  input: {
    paddingHorizontal: 20,
    fontSize: 18,
    flex: 1
  },
  send: {
    alignSelf: 'center',
    color: 'lightseagreen',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20
  }
});