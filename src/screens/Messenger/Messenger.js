import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    StyleSheet
} from 'react-native';

import { getMessages } from '../../store/actions/messenger';
import { CLEAR_MESSAGES } from '../../store/constants';
import { MessageCard } from './MessageCard';

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        messages: state.messenger.messages,
        messagesLoaded: state.messenger.messagesLoaded
    };
}

const mapDispatchToProps = (dispatch) => {

    return {
        getMessages : (config) => dispatch(getMessages(config)),
        clearMessages : () => dispatch({ type : CLEAR_MESSAGES })
    };
}

class MessengerScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        this.props.getMessages({
            sender: this.props.user.id,
            destination: this.props.target.id,
            isGroup: this.props.isGroup,
            pw: this.props.user.pw
        })
    }

    componentDidUpdate() {
        if (!this.props.messagesLoaded) {
            this.state.messages = this.props.messages;
            this.props.clearMessages();
        }
    }
    render() {
        
        let conversation;
        const { target, messages, user } = this.props;
		if (messages) {
			conversation = messages.map((message,i) => {

				/* Determine if chathead avatar should be displayed,
					based off consecutive messages  */
				let consecutiveMessage = false;
				if (i > 0) {
					if (messages[i-1].sender === messages[i].sender) {
						consecutiveMessage = true;
					}
				}

				let isSending = (message.sender === user.id);
				let targetPic = target.picture;
				
				/* Change target picture according to group chat */
				if (target.isGroup) {
					for (var j = 0; j < members.length; j++) {
						if (members[j].id === message.sender) {
							targetPic = members[j].picture;
						}
					}
				}

				return <MessageCard key = {i}
								userPic = { user.picture } 
								targetPic = { targetPic } 
								isSending = { isSending }
								consecutiveMessage = { consecutiveMessage } 
								message = { message.message } 
								fileCode = { message.filecode } />
			});
        }
        return (
            <View style = {styles.container}>
                { conversation }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MessengerScreen);