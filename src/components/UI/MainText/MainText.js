import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { getTheme } from '../../../utility/theme';

const MainText = (props) => {

    return (
        <Text style = {styles.text}>
            {props.children}
        </Text>
    );
}

export default MainText;

const styles = StyleSheet.create({

    text: {
        color: getTheme('text'),
        backgroundColor: 'transparent'
    }
})