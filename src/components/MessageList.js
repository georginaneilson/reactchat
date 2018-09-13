import React, { Component } from 'react'
import ReactDom from 'react-dom'
import Message from './Message.js'


class MessageList extends Component {



    componentDidUpdate() {
        const node = ReactDom.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
        if (this.shouldScrollToBottom) {
            node.scrollTop = node.scrollHeight
        }
    }

    render() {

        if (!this.props.roomId) {
            return (
                <div className="message-list">
                    <div className="join-room">
                        &larr; Join a room!
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="message-list">
                    {this.props.messages.map((message, index) => {
                        return (
                            <Message key={index} username={message.senderId} text={message.text} />
                        )
                    })}
                </div>
            )
        }
    }
}


export default MessageList