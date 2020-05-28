import React from 'react';
import { Alert, Dimensions, Image, Platform, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { ADDRESS, RESET_APP_STATE, TOGGLE_THEME } from '../../store/constants';
import { resetDB } from '../../utility/database';
import { getColor } from '../../utility/theme';
import { saveThemeToDB } from '../../utility/userDatabase';

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        authData: state.auth.authData,
        theme: state.theme.theme
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetAppState: () => dispatch({ type: RESET_APP_STATE }),
        toggleTheme: () => dispatch({ type: TOGGLE_THEME })
    }
}

class SideDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
            switchValue: false
        }
        Dimensions.addEventListener('change',this.updateStyles);
    }

    updateStyles = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
        })
    }

    componentDidUpdate() {
        saveThemeToDB(this.props.theme)
        .then(() => {});
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change',this.updateStyles);
    }

    onDeleteAccount = () => {
        Alert.alert(
            'Delete account',
            'Are you sure you want to delete your account? You cannot undo this action.',
            [
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                },
                {text: 'Yes', onPress: () => {this.deleteAccount()}}
            ]
        );
    }

    deleteAccount = () => {
        fetch(`${ADDRESS}/users`, {
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                ...this.props.authData
            }),
            method : 'delete'
        })
        /* Parse the json response */
        .then(response => response.json())
        .then(res => {
            if (res.code === 0) {
                this.onSignOut();
            }
        })
        .catch(err => {
        });
    }

    onSignOut = () => {
        resetDB()
        .then(() => {
            this.props.navigation.navigate('Startup');
            this.props.resetAppState();
        })
    }

    onValueChange = () => {
        this.props.toggleTheme();
        this.setState({switchValue: (this.state.switchValue) ? false: true});
    }

    onViewProfile = () => {
        this.props.navigation.push('ProfileScreen');
    }

    render() {
        const { viewMode } = this.state;
        return (
            <View style = {[{ width: (viewMode === 'portrait') ? Dimensions.get('window').width * 0.78 : Dimensions.get('window').width * 0.41}, styles.container, {backgroundColor: getColor(this.props.theme, 'backgroundColor')}]}>
                <View style = {styles.profileIconContainer}>
                    <Image source = {{uri: this.props.user.picture}} style = {styles.imageContainer}/>
                    <View style = {styles.nameContainer}>
                        <Text style = {{color:getColor(this.props.theme, 'color')}}>{`${this.props.user.first} ${this.props.user.last}`}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress = {this.onViewProfile}>
                    <View style = {styles.drawerItem}>
                        <Icon style = {styles.drawerItemIcon} name = { Platform.OS === 'android' ? 'md-person' : 'ios-person'} size = {30} color = '#bbb' />
                        <Text style = {{color:getColor(this.props.theme, 'color')}}>My Profile</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {this.onDeleteAccount}>
                    <View style = {styles.drawerItem}>
                        <Icon style = {styles.drawerItemIcon} name = { Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} size = {30} color = '#bbb' />
                        <Text style = {{color:getColor(this.props.theme, 'color')}}>Delete account</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {this.onSignOut}>
                    <View style = {styles.drawerItem}>
                        <Icon style = {styles.drawerItemIcon} name = { Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'} size = {30} color = '#bbb' />
                        <Text style = {{color:getColor(this.props.theme, 'color')}}>Sign out</Text>
                    </View>
                </TouchableOpacity>
                <View style = {styles.drawerItem}>
                    <Switch 
                        onValueChange = {this.onValueChange} 
                        value = {this.state.switchValue}
                        trackColor = {{false: 'white', true: 'black'}}
                        thumbColor = {'white'}
                    />
                    <Text style = {{color: getColor(this.props.theme, 'color')}}>Toggle theme</Text>
                </View>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
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
        padding: 10
    },
    drawerItemIcon: {
        width: 30,
        marginLeft: 10,
        marginRight: 10
    },
    imageContainer: {
        width: 50,
        height: 50
    }
})