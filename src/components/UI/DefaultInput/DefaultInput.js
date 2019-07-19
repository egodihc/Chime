import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { getTheme } from '../../../utility/theme';

const DefaultInput = (props) => {

    return (
        <TextInput 
            underlineColorAndroid = 'transparent'
            {...props} 
            style = {[styles.input, props.style, (!props.valid && props.touched)? styles.invalid : null ]}
        />
    );
}

export default DefaultInput;

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderWidth: 1,
        color: getTheme('text'),
        backgroundColor: getTheme('input'),
        borderColor: '#eee',
        padding: 5,
        marginTop: 8,
        marginBottom: 8
    },
    invalid: {
        backgroundColor: '#f9c0c0',
        borderColor: 'red'
    }
});