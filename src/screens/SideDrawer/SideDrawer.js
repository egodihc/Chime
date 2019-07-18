import React from 'react';
import { connect } from 'react-redux';

import { View, Image, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MainText from '../../components/UI/MainText/MainText';

import { resetDB } from '../../utility/database';
import { RESET_APP_STATE } from '../../store/constants';

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetAppState: () => dispatch({ type: RESET_APP_STATE })
    }
}

class SideDrawer extends React.Component {

    onSignOut = () => {
        resetDB()
        .then((complete) => {
            
            this.props.navigation.navigate('Startup');
            this.props.resetAppState();
        })
    }

    onViewProfile = () => {
        this.props.navigation.push('ProfileScreen');
    }

    render() {

        return (
            <View style = {[{ width: Dimensions.get('window').width * 0.8}, styles.container]}>
                <View style = {styles.profileIconContainer}>
                    <Image source = {{uri: this.props.user.picture}} style = {styles.imageContainer}/>
                    <View style = {styles.nameContainer}>
                        <MainText>{`${this.props.user.first} ${this.props.user.last}`}</MainText>
                    </View>
                </View>
                <TouchableOpacity onPress = {this.onViewProfile}>
                    <View style = {styles.drawerItem}>
                        <Icon style = {styles.drawerItemIcon} name = { Platform.OS === 'android' ? 'md-person' : 'ios-person'} size = {30} color = '#bbb' />
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

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        backgroundColor: '#333',
        flex: 1
    },
    profileIconContainer: {
        marginLeft: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30
    },
    nameContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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
    },
    imageContainer: {
        width: 50,
        height: 50
    }
})