import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class SideDrawer extends React.Component {


    constructor(props) {
        super(props);
    }


    onSettingsPressed = () => {
        this.props.navigator.push({
            screen: 'chime.SettingsScreen',
            title: 'Settings'
        })
    }


    render() {

        return (
            <View style = {[{ width: Dimensions.get('window').width * 0.8}, styles.container]}>
                <TouchableOpacity onPress = { () => { this.props.navigator.pop()} }>
                    <View style = {styles.drawerItem}>
                        <Icon style = {styles.drawerItemIcon} name = { Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'} size = {30} color = '#bbb' />
                        <Text>Sign out</Text>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity onPress = {this.onSettingsPressed}>
                    <View style = {styles.drawerItem}>
                        <Icon style = {styles.drawerItemIcon} name = { 'md-settings'} size = {30} color = '#bbb' />
                        <Text>Settings</Text>
                    </View>
                </ TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        backgroundColor: 'white',
        flex: 1
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#eee'
    },
    drawerItemIcon: {
        marginLeft: 10,
        marginRight: 10
    }
})


export default SideDrawer;

