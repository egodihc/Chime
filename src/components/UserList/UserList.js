import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getList } from '../../store/actions/list';
import { CLEAR_MESSAGE_STATE } from '../../store/constants';
import { insertContactData } from '../../utility/contactsDatabase';
import UserCard from './UserCard';

const mapStateToProps = (state) => {
    return {
        authData: state.auth.authData,
        list: state.list.list
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getList : (authData) => dispatch(getList(authData)),
        clearMessages: () => dispatch({ type : CLEAR_MESSAGE_STATE })
    };
}

class UserList extends React.Component {
    interval;

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.getList();
        this.interval = setInterval(this.getList, 10000);
    }

    componentWillUnmount = () => {
        clearInterval(this.interval);
    }

    getList = () => {
        this.props.getList(this.props.authData.username);
    }

    componentDidUpdate = () => {
        /* Save contacts to DB every time user list updates */
        const { list } = this.props;
        if (list.length > 0) {
            for (let i = 0; i < list.length; i++) {
                const { first, last, username, lastSeen, picture } = list[i];
                insertContactData(first, last, username, lastSeen, picture)
                .then(() =>{})
                .catch(err => alert(err));
            }
        }
    }
    
    onSelectUser = (user) => {
        /* Clear messages when new user is selected */
        this.props.clearMessages();
        this.props.onSelectUser(user);
    }


    render() {
        const userList = this.props.list.map((user) => {
            return <UserCard 
                        key = {`${Math.random()} ${Math.random()}`}
                        onSelectUser = {this.onSelectUser}
                        user = { user }
                             />
        });

        return (
            <ScrollView style = {styles.container}>
                { userList }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        height: '80%'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserList);