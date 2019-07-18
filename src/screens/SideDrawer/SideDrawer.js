import React from 'react';
import { connect } from 'react-redux';

import { View, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MainText from '../../components/UI/MainText/MainText';

import { resetDB } from '../../utility/database';
import { RESET_APP_STATE } from '../../store/constants';

const mapDispatchToProps = (dispatch) => {
    return {
        resetAppState: () => dispatch({ type: RESET_APP_STATE })
    }
}

class SideDrawer extends React.Component {

    onSignOut = () => {
        resetDB()
        .then((complete) => {
            this.props.resetAppState();
            this.props.navigation.navigate('Startup');
        })
    }

    onViewProfile = () => {
        this.props.navigation.push('ProfileScreen');
    }

    render() {

        return (
            <View style = {[{ width: Dimensions.get('window').width * 0.8}, styles.container]}>
                <TouchableOpacity onPress = {this.onViewProfile}>
                    <View style = {styles.drawerItem}>
                        <Icon style = {styles.drawerItemIcon} name = { Platform.OS === 'android' ? 'md-person' : 'ios-log-out'} size = {30} color = '#bbb' />
                        <MainText>My Profile</MainText>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {this.onSignOut}>
                    <View style = {styles.drawerItem}>
                        <Icon style = {styles.drawerItemIcon} name = { Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'} size = {30} color = '#bbb' />
                        <MainText>Sign out</MainText>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect(null, mapDispatchToProps)(SideDrawer);

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        backgroundColor: '#333',
        flex: 1
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#333'
    },
    drawerItemIcon: {
        marginLeft: 10,
        marginRight: 10
    }
})