import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { login, loadUser } from '../../store/actions/auth';
import { loadList } from '../../store/actions/messenger';

import { resetDB, initDB } from '../../utility/database';
import { getContacts } from '../../utility/contactsDatabase';
import { getUser, insertUserData } from '../../utility/userDatabase';
import Login from '../Login/Login';

const FLAG = 0;

export const mapDispatchToProps = (dispatch) => {
    return {
        login : (authData) => dispatch(login(authData)),
        loadUser: (user) => dispatch(loadUser(user)),
        loadList: (list) => dispatch(loadList(list))
    }
}

class StartScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAuth: false
        }
    }

    showAuthScreen = () => {
        this.setState({ showAuth : true });
    }

    componentDidMount() {

        if (FLAG === 0) {
            initDB()
            .then(complete => {
                getUser()
                .then(user => {
                    if (user) {
                        getContacts()
                        .then(contacts => {
                            this.props.login({ ...user });
                            this.props.loadUser({ ...user });
                            const list = this.constructList(contacts);
                            this.props.loadList(list);
                            this.props.navigation.navigate('MainTab');
                        });
                    }
                    else {
                        this.showAuthScreen();
                    }
                })
            })
            .catch(() => {
                alert('Something went wrong, please restart the application');
            })
        }
        else {
            resetDB()
            .then(() => {
                alert(`Application reset mode : ON`);
            })
            .catch(() => {
                alert('Application already reset');
            })
        }
    }

    onLoginSuccess = (user) => {
        const { first, last, id, email, picture, pw } = user;
        insertUserData(first, last, email, pw, id, picture)
        .then(complete => {
            if (complete) {
                this.props.navigation.navigate('MainTab');
            }
            else {
                alert('Could not save user to database.');
            }
        })
    }

    constructList = (contacts) => {
        const list = [];
        for (let i = 0;i < contacts.length; i++) {
            const user = contacts.item(i);
            list.push({ ...user });
        }
        return list;
    }

    render() {

        let mainSection;

        if (this.state.showAuth) {
            mainSection = 
            <Login onLoginSuccess = {this.onLoginSuccess}/>
        }

        return (
            <View style = {styles.fullContainer}>
                {mainSection}
            </View>
        )
    }
}


export default connect(null, mapDispatchToProps)(StartScreen);

const styles = StyleSheet.create({
    fullContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        textAlign: 'center'
    },
    input: {
        backgroundColor: '#eee',
        width: '80%',
        borderWidth: 1,
        borderColor: 'black'
    }
})