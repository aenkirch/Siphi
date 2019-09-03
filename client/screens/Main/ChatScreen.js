import React, { Component } from 'react';
import { connect } from "react-redux";

import { GiftedChat } from 'react-native-gifted-chat';

/*
    *
    *   Every websocket communication we try to make here is only functional if the user is authenticated : no security leak around here.
    * 
    *   TODO :
    *
    *   - navigation par topics
    *   - sauvegarde des msgs sur la BD et récupération des msgs
    * 
*/

const mapStateToProps = state => {
    return { socket: state.socket }
};

class connectedChatScreen extends Component {

    state = { messages: [] }

    componentDidMount() {

        // Listening to new messages sent

        this.props.socket.on('message', (msg) => this._storeNewMessage(msg));
    }

    onSend(msg = []) {

        this._storeNewMessage(msg);
        
        // console.log(msg);

        this.props.socket.emit('message', msg);
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={msg => this.onSend(msg)}
            />
        );
    }

    //helper functions
    _storeNewMessage(newMsg) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, newMsg),
        }));
    }
}

connectedChatScreen.navigationOptions = {
  title: 'Chat',
};

const ChatScreen = connect(mapStateToProps)(connectedChatScreen);

export default ChatScreen;