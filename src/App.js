import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import NewRoomForm from './components/NewRoomForm';
import SendMessageForm from './components/SendMessageForm'
import { tokenUrl, instanceLocator } from './config';


class App extends Component {

  constructor() {
    super()
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)
  }


  componentDidMount() {

    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: "Monika",
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
    this.setState({
      messages: []
    })

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
      .then(room => {
        this.setState({
          roomId: room.id
        })
        this.getRooms()
      })
      .catch(error => {
        console.error('Error getting rooms: ', error)
      })
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    })
  }

  createRoom(name) {
    this.currentUser.createRoom({
      name
    })
      .then(room => this.subscribeToRoom(room.id))
      .catch(error => console.error('error: ', error))
  }


  render() {
    return (
      <div className="app">
        <RoomList
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
        />
        <MessageList 
          roomId={this.state.roomId}
          messages={this.state.messages} />
        <NewRoomForm createRoom={this.createRoom} />
        <SendMessageForm 
          disabled={!this.state.roomId}
          sendMessage={this.sendMessage} />
      </div>
    );
  }
}



export default App;