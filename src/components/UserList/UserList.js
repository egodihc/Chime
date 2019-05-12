import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    Text,
    StyleSheet
} from 'react-native';

import { getList } from '../../store/actions/messenger';
import UserCard from './UserCard';
import { Navigation } from 'react-native-navigation';

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        list: state.messenger.list
    };
}

const mapDispatchToProps = (dispatch) => {

    return {
        getList : (authData) => dispatch(getList(authData))
    };
}

class UserList extends React.Component {

    constructor(props) {
        super(props);
        const user = this.props.user;
        this.props.getList({
            id: user.id,
            pw: user.pw
        })
        
    }

    onSelectUser = (id) => {
        this.props.onSelectUser(id);
    }

    render() {

        let userList = null;
        
        userList = this.props.list.map((user,i) => {
            return <UserCard key = {i}
                            onSelectUser = {this.onSelectUser}
                            user = { user }
                             />
        });

        
        return (
            <View style = {styles.container}>
                { userList }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        height: '50%',
        alignItems: 'center'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserList);