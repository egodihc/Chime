import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

export const MessageCard = ({ userPic, targetPic, isSending, message, fileCode, consecutiveMessage }) => {

    let finalMessage =       
   
        <View style = { [ styles.card, (isSending) ? styles.sender : styles.receiver] }>
            <Text>
                { message }
            </Text>
        </View>
 


    return (
        <View>
            {finalMessage}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center'
    },
    sender: {
        backgroundColor: '#ADD8E6',
        alignSelf: 'flex-end',
        alignItems: 'flex-end'
    },
    receiver: {
        backgroundColor: '#DEDEDE',
        alignSelf: 'flex-start',
        alignItems: 'flex-start'
    }
})