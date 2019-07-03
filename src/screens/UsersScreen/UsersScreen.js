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


const mapStateToProps = (state) => {
    return {
        theme: state.settings.theme
    }
}

class UsersScreen extends React.Component {

    // static navigatorStyle = {
    //     tabBarButtonColor: getTheme(null,null),
    //     tabBarSelectedButtonColor: getTheme(null,null),
    //     forceTitlesDisplay: true
    // }

    constructor(props) {
        super(props);
        // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    componentDidMount() {
        this.updateStyles();
    }

    componentDidUpdate() {
        this.updateStyles();
    }

    updateStyles = () => {
        Navigation.mergeOptions("UsersScreen", {
            topBar: {
                background: {
                    color: getTheme(this.props.theme, 'bg')
                },
                title: {
                    color: getTheme(this.props.theme, 'text')
                }
            },
            bottomTabs: {
                backgroundColor: getTheme(this.props.theme, 'bg'),

            },
            bottomTab: {
                iconColor: getTheme(this.props.theme, 'text'),
                textColor: getTheme(this.props.theme, 'text'),
                selectedIconColor: getTheme(this.props.theme, 'text'),
                selectedTextColor: getTheme(this.props.theme, 'text')
            }
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
                Navigation.push("MessengerStack", {
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
                            // navigatorButtons: {
                            //     leftButtons: [{
                            //         icon: icon[0],
                            //         id: 'backPress',
                            //         buttonColor: getTheme(this.props.theme, 'text')
                            //     }],
                            //     rightButtons: [{
                            //         icon: { uri :user.picture },
                            //         id: 'viewProfile'
                            //     }] 
                            // }
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