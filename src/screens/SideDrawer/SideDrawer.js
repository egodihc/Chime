import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Navigation } from 'react-native-navigation';

import { getTheme } from '../../utility/theme';
import { hideDrawer } from '../NavigationUtility/navigationUtility';
import { resetDB } from '../../utility/database';

const mapStateToProps = (state) => {
    return {
        theme : state.settings.theme
    }
}

class SideDrawer extends React.Component {

    onSettingsPressed = () => {
        hideDrawer();
        Navigation.push("TabsStack", {
            component: {
                id: "SettingsID",
                name: 'chime.SettingsScreen',
                options: {
                    topBar: {
                        title: {
                            text: 'Settings'
                        }
                    }
                }
            }
        })
    }

    signOut = () => {
        resetDB()
        .then(() => {
            Navigation.setRoot({
                root: {
                    stack: {
                        id: 'AppStack',
                        children: [{
                            component: {
                                name: 'chime.StartScreen'
                            }
                        }]
                    }
                }
            });
        });
    }

    render() {

        return (
            <View style = {[{ width: Dimensions.get('window').width * 0.8}, styles.container, { backgroundColor: getTheme(this.props.theme, 'bg')}]}>
                <TouchableOpacity onPress = {this.onSettingsPressed }>
                    <View style = {[styles.drawerItem, { backgroundColor: getTheme(this.props.theme, 'bg')}]}>
                        <Icon style = {styles.drawerItemIcon} name = { 'md-settings'} size = {30} color = '#bbb' />
                        <Text style = { {color: getTheme(this.props.theme, 'text')} }>Settings</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {this.signOut }>
                    <View style = {[styles.drawerItem, { backgroundColor: getTheme(this.props.theme, 'bg')}]}>
                        <Icon style = {styles.drawerItemIcon} name = { Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'} size = {30} color = '#bbb' />
                        <Text style = { {color: getTheme(this.props.theme, 'text')} }>Sign out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect(mapStateToProps, null)(SideDrawer);

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