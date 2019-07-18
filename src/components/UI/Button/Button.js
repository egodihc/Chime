import React from 'react';
import { 
    TouchableOpacity, 
    TouchableNativeFeedback, 
    Text, 
    View, 
    StyleSheet,
    Platform 
} from 'react-native';

const Button = (props) => {

    const content = (
        <View style = {[styles.button, (props.disabled) ? styles.disabled : null, props.style ]}>
            <Text style = {[ styles.text,  { color : props.textColor } , (props.disabled) ? styles.disabledText : null]}>
                { props.children }
            </Text>
        </View>
    );

    if (props.disabled) {
        return content;
    }

    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback onPress = {props.onPress}>
                { content }
            </TouchableNativeFeedback>
        );
    }
    else {
        return (
            <TouchableOpacity onPress = {props.onPress}>
                { content }
            </TouchableOpacity>
        );
    }
}

export default Button;

const styles = StyleSheet.create({

    button: {
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'black'
    },
    text: {
        color: 'black',
        textAlign: 'center'
    },
    disabled: {
        backgroundColor: '#eee',
        borderColor: '#aaa'
    },
    disabledText: {
        color: '#aaa'
    }
})