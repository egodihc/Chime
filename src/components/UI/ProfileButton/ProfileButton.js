import React from 'react';
import { 
    TouchableOpacity, 
    TouchableNativeFeedback,
    StyleSheet,
    Platform,
    Image
} from 'react-native';

const button = (props) => {

    const content = 
        <Image source = { { uri : props.picture }} style = {styles.chatHead} />;

    if (props.disabled) {
        return content;
    }

    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback>
                { content }
            </TouchableNativeFeedback>
        );
    }
    else {
        return (
            <TouchableOpacity>
                { content }
            </TouchableOpacity>
        );
    }
}

export default button;

const styles = StyleSheet.create({
    chatHead: {
        width: 50,
        height: 50,
        borderRadius: 50/2,
        marginLeft: 5,
        marginRight: 100
    },
})