import React from 'react';

import { View, Text, Image, StyleSheet } from 'react-native';
import { getDefaultTheme } from '../../utility/theme';

export const MessageCard = ({ userPic, targetPic, isSending, message, fileCode, consecutiveMessage }) => {

    let finalMessage =       
   
        <View style = { [ styles.card, (isSending) ? styles.sender : styles.receiver] }>
            <Text style = { (isSending ? { color: 'white'} : { color: 'black' })}>
                { message }
            </Text>
        </View>
 
    let chatHead = <View style = {styles.padView}></View>;

    if (!consecutiveMessage) {
        chatHead = <Image source = { { uri : ((isSending) ? userPic : targetPic) }} style = {styles.chatHead} />;
    }

    return (
        <View style = { (!isSending) ? styles.container: styles.reverseContainer }>
            {chatHead}
            {finalMessage}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    reverseContainer: {
        flexDirection: 'row-reverse'
    },
    padView: {
        padding: 25
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
        justifyContent: 'center'
    },
    sender: {
        backgroundColor: getDefaultTheme(),
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
        backgroundColor: '#DEDEDE',
        alignSelf: 'flex-start'
    }
})