import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    StyleSheet
} from 'react-native';
import UserList from '../../components/UserList/UserList';
import Settings from '../Settings/Settings';
import { getTheme } from '../../utility/theme';
import Icon from 'react-native-vector-icons/Ionicons';

const mapStateToProps = (state) => {
    return {
        theme: state.settings.theme
    }
}

class UsersScreen extends React.Component {

    static navigatorStyle = {
        tabBarButtonColor: getTheme(null,null),
        tabBarSelectedButtonColor: getTheme(null,null),
        forceTitlesDisplay: true
    }

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    componentDidMount() {
        this.updateStyles();
    }

    componentDidUpdate() {
        this.updateStyles();
    }

    updateStyles = () => {
        this.props.navigator.setStyle({
            navBarTextColor: getTheme(this.props.theme, 'text'),
            navBarButtonColor: getTheme(this.props.theme, 'text'),
            navBarBackgroundColor: getTheme(this.props.theme, 'bg'),
            tabBarBackgroundColor: getTheme(this.props.theme, 'bg')
        }); 
    }


    /* Passes target as props to messenger screen */
    onSelectUser = (user) => {
        // TODO:
        // Debouncer to prevent stacking of multiple routes
        Promise.all([
            Icon.getImageSource('md-arrow-back', 30)
        ])
        .then(
            (icon) => {
                this.props.navigator.push({
                    screen: 'chime.MessengerScreen',
                    title: `${user.first} ${user.last}`,
                    passProps: {
                        target: user,
                        isGroup: false
                    },
                    overrideBackPress: true,
                    navigatorButtons: {
                        leftButtons: [{
                            icon: icon[0],
                            id: 'backPress',
                            buttonColor: getTheme(this.props.theme, 'text')
                        }],
                        rightButtons: [{
                            icon: { uri :user.picture },
                            id: 'viewProfile'
                        }] 
                    }
                })
            }
        )

    }


    onNavigatorEvent = (event) => {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'settingsToggle') {
                this.props.navigator.push({
                    screen: 'chime.SettingsScreen',
                    title: 'Settings',
                    animationType: 'fade'
                })
            }
        }
    }


    render() {
        this.props.navigator.setStyle({
            tabBarBackgroundColor: getTheme(this.props.theme, 'bg')
        }); 
        return (
            
            <View style = {[styles.container, { backgroundColor : getTheme(this.props.theme, 'bg')}]}>
                <UserList onSelectUser = {this.onSelectUser}/>
                <Settings></Settings>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default connect(mapStateToProps, null)(UsersScreen);