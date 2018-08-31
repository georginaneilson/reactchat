import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';
import MessageList from './components/MessageList';
import Message from './components/Message';
import { tokenUrl, instanceLocator } from './config';
import './App.css';


class App extends Component {

  constructor() {
    super()
    this.state = {
      messages: []
    }

  }


  componentDidMount() {

    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: "TestUser",
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    })


    chatManager.connect()
      .then(currentUser => {
        console.log("Connected as user ", currentUser);
        currentUser.subscribeToRoom({
          roomId: 15111315,
          hooks: {
            onNewMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              })
            }
          }
        });
      })
      .catch(error => {
        console.error('error:', error);
      })
  }


  render() {
    return (
      <div className="app">
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}

export default App;