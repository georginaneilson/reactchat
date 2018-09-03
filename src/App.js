import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm'
import { tokenUrl, instanceLocator } from './config';
import './App.css';


class App extends Component {

  constructor() {
    super()
    this.state = {
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this);
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
        this.currentUser = currentUser

        this.currentUser.getJoinableRooms()
        .then(joinableRooms => {
           this.setState({
             joinableRooms,
             joinedRooms: this.currentUser.rooms
           })
        })
          .catch(error => console.error('error on joinableRooms:', error))

        this.currentUser.subscribeToRoom({
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
        console.error('error on subscribeToRoom (connecting):', error);
      })
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: 15111315
    })
  }


  render() {
    return (
      <div className="app">
        <RoomList rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage}/>
      </div>
    );
  }
}

export default App;