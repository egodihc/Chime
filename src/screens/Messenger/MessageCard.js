import React from 'react';
import {
    View, 
    Text, 
    Image, 
    StyleSheet,
    TouchableNativeFeedback
} from 'react-native';

import { getColor } from '../../utility/theme';
import { epochToReadable } from '../../utility/date';

class MessageCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showDate: false
        }
    }

    toggleDate = () => {
        this.setState({ showDate: !this.state.showDate });
    }

    getDateString = (ts) => {
        return epochToReadable(ts);
    }

    render() {

        const { targetPic, userPic, isSending, message, isImage, consecutiveMessage, timestamp } = this.props;
        const { showDate } = this.state;
        
        let date;
        if (showDate) {
            date = 
            <Text style = {{ color: getColor(this.props.theme, 'color')}}>
                { this.getDateString(timestamp) }
            </Text>
        }

        /* Assume message is normal text */
        let finalMessage =       
        
            <View style = {(!isSending) ? styles.fullContainer: styles.reverseFullContainer}>
                <TouchableNativeFeedback onPress = {this.toggleDate} >
                    <View
                        style = { [ 
                            styles.card, 
                            (isSending) ? styles.sender : styles.receiver, 
                            (isSending) ? { backgroundColor: getColor(this.props.theme, 'msgSender')} : { backgroundColor: getColor(this.props.theme, 'msgReceiver')},
                        ] }
                    >
                        <Text style = {[ styles.message,(isSending ? { color: getColor(this.props.theme, 'msgSenderColor')} : { color: getColor(this.props.theme, 'msgReceiverColor') })]}>
                            { message }
                        </Text>
                    </View>
                </TouchableNativeFeedback>
                { date }
            </View>;
        
        /* Check if message is image */
        if (isImage === 1) {
            finalMessage = 
            <View style = {[ (isSending) ? styles.sender : styles.receiver,  styles.card] }>
                <Image  
                    style = {styles.image}
                    source = {{uri:message}}
                    resizeMode="cover"
                ></Image>
            </View>
    
        }
    
        /* Only display user avatar next to message if not consecutive message */
        let chatHead = <View style = { styles.chatHead}></View>;
        if (!consecutiveMessage) {
            if (!isSending) {
                chatHead = <Image source = { { uri :  targetPic }} style = {styles.chatHead} />;
            }
            else {
                chatHead = <Image source = { { uri :  userPic }} style = {styles.chatHead} />;
            }
        }
        
        return (
            <View style = { (!isSending) ? styles.container: styles.reverseContainer }>
                {chatHead}
                {finalMessage}
            </View>
        );
    }
}

export default MessageCard;


const styles = StyleSheet.create({
    fullContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    reverseFullContainer: {
        flex:1,
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: 'center'   
    },
    container: {
        flexDirection: 'row'
    },
    reverseContainer: {
        flexDirection: 'row-reverse'
    },
    card: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 2,
        marginRight: 2,
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 10,
        justifyContent: 'center',
        maxWidth: '50%'
    },
    sender: {
        alignSelf: 'flex-end'
    },
    chatHead: {
        width: 50,
        height: 50,
        borderRadius: 50/2,
        marginLeft: 5,
        marginRight: 5
    },
    receiver: {
        alignSelf: 'flex-start'
    },
    image: {
        minHeight: 300,
        maxHeight: 300,
        height: '100%',
        width: '100%',
        borderRadius: 10
    },
    message: {
        fontWeight : '200'
    }
})