import React from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import { 
    View,
    StyleSheet
} from 'react-native';

import UserList from '../../components/UserList/UserList';
import { getTheme } from '../../utility/theme';
import { navigationButtonPressed, updateStyles } from '../NavigationUtility/navigationUtility';


const mapStateToProps = (state) => {
    return {
        theme: state.settings.theme
    }
}

class UsersScreen extends React.Component {

    constructor(props) {
        super(props);
        this.navigationEventListener = Navigation.events().bindComponent(this, "UsersScreen");
    }

    componentDidMount() {
        this.updateStyles();
    }

    componentDidUpdate() {
        this.updateStyles();
    }

    componentDidAppear() {
        this.updateStyles();
    }

    updateStyles = () => {
        updateStyles("UsersScreen", this.props.theme);
    }

    componentWillUnmount() {
        if (this.navigationEventListener) {
            this.navigationEventListener.remove();
        }
    }

    navigationButtonPressed = ({ buttonId }) => {
        navigationButtonPressed(buttonId, "UsersScreen");
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
                Navigation.push("TabsStack", {
                    component: {
                        id: "MessengerID",
                        name: 'chime.MessengerScreen',
                        passProps: {
                            target: user,
                            isGroup: false
                        },
                        options: {
                            topBar: {
                                title: {
                                    text: `${user.first} ${user.last}`
                                }
                            }
                        }
                    }
                })
            }
        )

    }


    render() {
        return (
            
            <View style = {[styles.container, { backgroundColor : getTheme(this.props.theme, 'bg')}]}>
                <UserList onSelectUser = {this.onSelectUser}/>
                {/* <Settings></Settings> */}
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