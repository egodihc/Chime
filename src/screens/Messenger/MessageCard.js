import React from 'react';

import {
    View, 
    Text, 
    Image, 
    StyleSheet,
    TouchableNativeFeedback
} from 'react-native';
import { getTheme } from '../../utility/theme';
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
        // TODO 
        // Convert to human readable format
        return epochToReadable(ts);
    }

    render() {

        const { targetPic, isSending, message, fileCode, consecutiveMessage, isSent, timestamp } = this.props;
        const { showDate } = this.state;

        let isNotSent = false;
        if (isSending && !isSent) {
            isNotSent = true;
        }
        
        let date;
        if (showDate) {
            date = 
            <Text>
                { this.getDateString(timestamp) }
            </Text>
        }

        /* Assume message is normal text */
        let finalMessage =       
            <TouchableNativeFeedback onPress = {this.toggleDate} >
                <View style = { (!isSending) ? styles.fullContainer: styles.reverseFullContainer  }>
                    <View
                        style = { [ 
                            styles.card, 
                            (isSending) ? styles.sender : styles.receiver, 
                            (isSending) ? { backgroundColor: getTheme('BLUE', false)} : { backgroundColor: '#DEDEDE'},
                            (isNotSent) ? { opacity: 0.6 } : null
                        ] }
                    >
                        <Text style = {[ styles.message,(isSending ? { color: 'white'} : { color: 'black' })]}>
                            { message }
                        </Text>
                    </View>
                    { date }
                </View>
            </TouchableNativeFeedback>;
        
        /* Check if message is image */
        if (fileCode === 0 || fileCode === 1) {
            finalMessage = 
            <View style = {[ (isSending) ? styles.sender : styles.receiver,  styles.card] }>
                <Image  
                    style = { styles.image} 
                    source = {{uri:message}}
                    resizeMode="cover"
                ></Image>
            </View>
    
        }
    
    
        /* Only display user avatar next to message if not consecutive message and is receiving */
        let chatHead = <View style = { (isSending) ? {padding : 10 } : { padding : 27 } }></View>;
        if (!consecutiveMessage) {
            if (!isSending) {
                chatHead = <Image source = { { uri :  targetPic }} style = {styles.chatHead} />;
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
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    reverseFullContainer: {
        flex:1,
        flexDirection: 'column',
        alignItems: 'flex-end'   
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