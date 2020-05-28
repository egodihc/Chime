import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import DefaultInput from '../../UI/DefaultInput/DefaultInput';
import { getColor } from '../../../utility/theme';

class MessengerInput extends React.Component {
    
    render() {
        return (
            <View style = { styles.inputContainer }>
                <View style = {[styles.media, (this.props.viewMode === 'portrait') ? null : styles.landscapeMediaContainer ]}>
                    <TouchableOpacity onPress = {this.props.onLaunchCamera}>
                        <Icon name = { 'md-camera' } color = { getColor(this.props.theme, 'special') } size = {30}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {this.props.onLaunchImageLibrary}>
                        <Icon name = { 'md-image' } color = { getColor(this.props.theme, 'special') } size = {30}/>
                    </TouchableOpacity>
                </View>

                <View style = {[styles.textArea , (this.props.viewMode === 'portrait') ? null : styles.landscapeTextAreaContainer ]}>
                    <DefaultInput 
                        style = {styles.messageInput} 
                        placeholder = 'Send a message'
                        theme={this.props.theme}
                        onChangeText = {this.props.onChangeText}
                        value = {this.props.value}
                    />
                    <TouchableOpacity onPress = {this.props.onSend}>
                        <Icon name = { 'md-send' } color = { getColor(this.props.theme, 'special') } size = {30}/>
                    </TouchableOpacity>
                </View>
            </View>


        )
    }
}

export default connect(null, null)(MessengerInput);

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 10,
    },
    media: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '20%'
    },
    landscapeMediaContainer: {
        width: '10%'
    },
    messageInput: {
        borderRadius: 5,
        width: '85%'
    },
    textArea: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    landscapeTextAreaContainer: {
        width: '90%'
    }
})