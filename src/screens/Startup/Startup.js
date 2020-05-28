import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { loadUser, login } from '../../store/actions/auth';
import { loadList } from '../../store/actions/list';
import { SET_THEME } from '../../store/constants';
import { constructList } from '../../utility/contacts';
import { getContacts } from '../../utility/contactsDatabase';
import { initDB, resetDB } from '../../utility/database';
import { getUser, insertUserData } from '../../utility/userDatabase';
import Auth from '../Auth/Auth';

const FLAG = 0;

export const mapDispatchToProps = (dispatch) => {
    return {
        login : (authData) => dispatch(login(authData)),
        loadUser: (user) => dispatch(loadUser(user)),
        loadList: (list) => dispatch(loadList(list)),
        setTheme: (theme) => dispatch({type: SET_THEME, payload: theme})
    }
}

class StartScreen extends React.Component {
    state = {
        showAuth: false
    }

    showAuthScreen = () => {
        this.setState({ showAuth : true });
    }

    componentDidMount() {
        if (FLAG === 0) {
            initDB()
            .then(() => {
                getUser()
                .then(user => {
                    if (user) {
                        getContacts()
                        .then(contacts => {
                            this.props.login({ username: user.username, password: user.password });
                            this.props.loadUser({ 
                                username: user.username,
                                password: user.password,
                                first: user.first,
                                last: user.last
                            });
                            this.props.setTheme(user.theme);
                            const list = constructList(contacts);
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
        const { first, last, username, picture, password } = user;
        insertUserData(first, last, username, password, picture)
        .then(complete => {
            if (complete) {
                this.props.navigation.navigate('MainTab');
            }
            else {
                alert('Could not save user to database.');
            }
        })
    }

    render() {
        let mainSection;

        if (this.state.showAuth) {
            mainSection = 
                <Auth onLoginSuccess = {this.onLoginSuccess} />
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