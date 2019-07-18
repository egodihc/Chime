import React from 'react';
import { Text, StyleSheet } from 'react-native';

const HeadingText = (props) => {

    return (
        <Text 
        {...props}
        style = {[styles.textHeading, props.style]} 
        >
        { props.children }
        </Text>
    );
}

export default HeadingText;

const styles = StyleSheet.create({

    textHeading: {
        fontSize: 28,
        fontWeight: 'bold'
    }
});