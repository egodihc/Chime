import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    Text
} from 'react-native';
import { getList } from '../../store/actions/messenger';
import UserCard from './UserCard';

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

    render() {

        let userList = null;

        userList = this.props.list.map((user,i) => {
            return <UserCard key = {i}
                            user = { user }
                             />
        });

        
        return (
            <View>
                { userList }
                <Text>
                </Text>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);