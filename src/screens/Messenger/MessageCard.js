import React from 'react';

import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { getTheme } from '../../utility/theme';

export const MessageCard = ({ userPic, targetPic, isSending, message, fileCode, consecutiveMessage, theme }) => {

    let finalMessage =       
   
        <View style = { [ styles.card, (isSending) ? styles.sender : styles.receiver, (isSending) ? { backgroundColor: getTheme(theme)} :null ] }>
            <Text style = { (isSending ? { color: 'white'} : { color: 'black' })}>
                { message }
            </Text>
        </View>
    
    if (fileCode === 0 || fileCode === 1) {
        finalMessage = 
        <View style = {[ (isSending) ? styles.sender : styles.receiver,  styles.msgImage] }>
            <Image  
                style = { styles.image} 
                source = {{uri:message}}
                resizeMode="cover"
            ></Image>
        </View>

    }
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
        backgroundColor: '#DEDEDE',
        alignSelf: 'flex-start'
    },
    msgImage: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 10,
        justifyContent: 'center'
    },
    image: {
        height: '100%',
        width: '100%'
    }
})