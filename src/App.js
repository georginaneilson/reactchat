import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm'
import { tokenUrl, instanceLocator } from './config';


class App extends Component {

  constructor() {
    super()
    this.state = {
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
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
        this.getRooms()
      })

      .catch(error => {
        console.error('error connecting:', error);
      })
  }

  getRooms() {
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        })
      })
      .catch(error => {
        console.error('error getting joinableRooms:', error);
      })
  }

    subscribeToRoom(roomId) {
        this.currentUser.subscribeToRoom({
            roomId: roomId,
            hooks: {
                onNewMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                }
            }
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
        <RoomList 
        subscribeToRoom={this.props.subscribeToRoom}
        rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} 
        />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default App;