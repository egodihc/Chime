import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    StyleSheet
} from 'react-native';

import AuthScreen from '../Auth/Auth';
import { resetDB, checkUser } from '../../utility/database';
import { login, loadUser } from '../../store/actions/auth';
import startMainTabs from '../mainTabs/startMainTabs';
import { setTheme } from '../../store/actions/settings';
import { checkContacts } from '../../utility/contactsDatabase';
import { loadList } from '../../store/actions/messenger';

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

    showAuthScreen = () => {
        this.setState({ showAuth : true });
    }

    componentDidMount() {

        this.props.navigator.toggleNavBar({
            to: 'hidden',
            animated: false
        });

        if (FLAG === 0) {
            checkUser()
            .then(user => {
                if (user.length !== 0) {
                    checkContacts()
                    .then(contacts => {

                        this.props.login({ ...user.item(0) });
                        this.props.loadUser({ ...user.item(0) });
                        this.props.setTheme(user.item(0).theme);

                        const list = this.constructList(contacts);
                        this.props.loadList(list);

                        startMainTabs(user.item(0).theme);
                    });
                }
                else {
                    this.showAuthScreen();
                }
            })
        }
        else {
            resetDB();
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