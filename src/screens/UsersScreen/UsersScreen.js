import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    StyleSheet
} from 'react-native';
import UserList from '../../components/UserList/UserList';


class UsersScreen extends React.Component {


    static navigatorStyle = {
        navBarButtonColor: '#ADD8E6'
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onSelectUser = (user) => {
        let name =  `${user.first} ${user.last}`;
        this.props.navigator.push({
            screen: 'chime.Messenger',
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