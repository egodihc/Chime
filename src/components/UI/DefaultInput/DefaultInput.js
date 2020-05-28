import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { getColor } from '../../../utility/theme';

const DefaultInput = (props) => {

    return (
        <TextInput placeholderTextColor = {'#787878'}
            underlineColorAndroid = 'transparent'
            {...props} 
            style = {[
                styles.input, 
                props.style, 
                {
                    color: getColor(props.theme, 'color'),
                    backgroundColor: getColor(props.theme, 'backgroundColor'),
                    borderColor: getColor(props.theme, 'border')
                }]}
        />
    );
}

export default DefaultInput;

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#eee',
        padding: 5,
        marginTop: 8,
        marginBottom: 8
    }
});