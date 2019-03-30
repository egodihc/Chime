import React from 'react';
import { Text, StyleSheet } from 'react-native';

const headingText = (props) => {

    return (
        <Text 
        {...props}
        style = {[styles.textHeading, props.style]} 
        >
        { props.children }
        </Text>
    );
}

export default headingText;

const styles = StyleSheet.create({

    textHeading: {
        fontSize: 28,
        fontWeight: 'bold'
    }
});