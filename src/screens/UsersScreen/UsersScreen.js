import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    StyleSheet
} from 'react-native';
import UserList from '../../components/UserList/UserList';
import { getDefaultTheme } from '../../utility/theme';


class UsersScreen extends React.Component {


    static navigatorStyle = {
        navBarButtonColor: getDefaultTheme()
    };


    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    /* Passes target as props to messenger screen */
    onSelectUser = (user) => {
        let name =  `${user.first} ${user.last}`;
        this.props.navigator.push({
            screen: 'chime.MessengerScreen',
            title: name,
            passProps: {
                target: user,
                isGroup: false
            }
        })
    }


    onNavigatorEvent = (event) => {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'sideDrawerToggle') {
                this.props.navigator.toggleDrawer({
                    side: 'left',
                    animated: true,
                    to: 'open'
                });
            }
        }
    }


    render() {
        
        return (
            <View style = {styles.container}>
                <UserList onSelectUser = {this.onSelectUser}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default connect(null, null)(UsersScreen);