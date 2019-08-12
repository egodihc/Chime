import React from 'react';
import { connect } from 'react-redux';

import { 
    ScrollView,
    StyleSheet
} from 'react-native';

import UserCard from './UserCard';

import { setDisable } from '../../store/actions/messenger';
import { CLEAN_MESSAGES } from '../../store/constants';
import { getList } from '../../store/actions/list';

const mapStateToProps = (state) => {
    return {
        authData: state.auth.authData,
        list: state.list.list
    };
}

const mapDispatchToProps = (dispatch) => {

    return {
        getList : (authData) => dispatch(getList(authData)),
        clearMessages: () => dispatch({ type : CLEAN_MESSAGES })
    };
}

class UserList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.props.getList(this.props.authData.username);
    }

    componentDidUpdate = () => {
        // const { list } = this.props;
        // if (list.length > 0) {
        //     for (let i = 0; i < list.length; i++) {
        //         console.log(i, list[i]);
        //         const { first, last, id, lastSeen, picture } = list[i];
        //         insertContactData(first, last, id, lastSeen, picture)
        //         .then();
        //     }
        // }
    }
    
    onSelectUser = (user) => {
        // this.props.clearMessages();
        this.props.onSelectUser(user);
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
            <ScrollView style = {styles.container}>
                { userList }
            </ScrollView>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        height: '100%'
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(UserList);