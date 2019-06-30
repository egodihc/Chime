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

const FLAG = 0;

export const mapDispatchToProps = (dispatch) => {
    return {
        login : (authData) => dispatch(login(authData)),
        loadUser: (user) => dispatch(loadUser(user)),
        setTheme: (theme) => dispatch(setTheme(theme))
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
                    // TODO
                    // Login
                    console.log(user.item(0));
                    this.props.login({
                        email: user.item(0).Email,
                        password: user.item(0).Password
                    })
                    this.props.setTheme(user.item(0).Theme);
                    this.props.loadUser({
                        email: user.item(0).Email,
                        pw: user.item(0).Password,
                        id: user.item(0).ID,
                        first: user.item(0).First,
                        last: user.item(0).Last,
                        picture: user.item(0).Picture
                    })
                    startMainTabs(user.item(0).Theme);

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