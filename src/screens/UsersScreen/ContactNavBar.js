import React from 'react';

import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MainText from '../../components/UI/MainText/MainText';

class ContactNavBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.subContainer}>
                <TouchableOpacity onPress = {this.props.toggleDrawer}>
                    <Icon style = {styles.drawerItemIcon} name = { Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} size = {30} color = '#bbb' />
                </TouchableOpacity>
                <View>
                    <MainText>CONTACTS</MainText>
                </View>           
                </View>
            </View>
        )
    }
}


export default ContactNavBar;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%'
    },
    imageContainer: {
        width: 40,
        height: 40,
        borderRadius: 20
    }
})