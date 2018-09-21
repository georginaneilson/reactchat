import React, { Component } from 'react'
import ReactDom from 'react-dom'
import Message from './Message.js'


class MessageList extends Component {


    // scrollToBottom = () => {
    //     this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    // }

    // componentDidMount() {
    //     this.scrollToBottom();
    // }

    // componentDidUpdate() {
    //     this.scrollToBottom();
    // }



    // componentDidUpdate() {
    //     console.log('didupdate');
    //     const node = ReactDom.findDOMNode(this);
    //     this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
    //     if (this.shouldScrollToBottom) {
    //         node.scrollTop = node.scrollHeight
    //     }
    // }

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
                <div>
                <div className="message-list">
                    {this.props.messages.map((message, index) => {
                        return (
                            <Message key={index} username={message.senderId} text={message.text} />
                        )
                    })}
                </div>
                <div style={{ float: "left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
                </div>
            )
        }
    }
}


export default MessageList