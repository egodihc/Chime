import React from 'react';
import { connect } from 'react-redux';
import AuthScreen from '../Auth/Auth';
import { 
    View,
    StyleSheet
} from 'react-native';

import { login, loadUser } from '../../store/actions/auth';
import { loadList } from '../../store/actions/messenger';
import { setTheme } from '../../store/actions/settings';

import startMainTabs from '../mainTabs/startMainTabs';

import { resetDB, initDB } from '../../utility/database';
import { getContacts } from '../../utility/contactsDatabase';
import { getUser } from '../../utility/userDatabase';

const FLAG = 0;

export const mapDispatchToProps = (dispatch) => {
    return {
        login : (authData) => dispatch(login(authData)),
        loadUser: (user) => dispatch(loadUser(user)),
        setTheme: (theme) => dispatch(setTheme(theme)),
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

    static options(passProps) {
        return {
            topBar: {
                visible: false,
                drawBehind: true,
                animate: false
            }
        };
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
                            this.props.setTheme(user.theme);
    
                            const list = this.constructList(contacts);
                            this.props.loadList(list);
    
                            startMainTabs(user.theme);
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
            <AuthScreen/>
            
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