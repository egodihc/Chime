import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    Dimensions,
    StyleSheet, 
    Linking
} from 'react-native';


import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import Button from '../../components/UI/Button/Button';
import startMainTabs from '../mainTabs/startMainTabs';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { login } from '../../store/actions/auth';
import { SET_TRANSITIONED } from '../../store/constants';
import { getTheme } from '../../utility/theme';
import { insertUserData } from '../../utility/database';

const mapStateToProps = (state) => {
    return {
        isLoading: state.ui.isLoading,
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
        alreadyTransitioned : state.auth.alreadyTransitioned,
        theme: state.settings.theme
    };
}

const mapDispatchToProps = (dispatch) => {

    return {
        login : (authData) => dispatch(login(authData)),
        setTransition : () => dispatch({ type : SET_TRANSITIONED })
    };
}



class Auth extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
            authMode: 'login'
        }

        Dimensions.addEventListener('change',this.updateStyles);

    }

    componentDidUpdate() {

        /* Condition prevents this lifecycle hook from retriggering itself */
        if (this.props.isLoggedIn && !this.props.alreadyTransitioned) {
            const { first, last, id, email, picture, pw } = this.props.user;
            insertUserData(first, last, email, pw, id, picture)
            .then(complete => {
                if (complete) {
                    this.props.setTransition();
                    startMainTabs(this.props.theme);
                }
                else {
                    alert('Could not save user to database.');
                }
            })

        }

    }


    componentWillUnmount() {
    
        /* Prevent memory leak */
        Dimensions.removeEventListener('change',this.updateStyles);
    }


    updateStyles = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
        })
    }


    switchMode = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                authMode: prevState.authMode === 'login' ? 'signUp' : 'login'
            }
        })
    }

    openUrl = () => {
        Linking.openURL('https://chime2.netlify.com');
    }

    render() {

        let mainSection = null;

        if (this.state.authMode === 'signUp') {
            mainSection = <Register />;
        }
        else {
            mainSection = <Login />;
        }

        return (
            <View style = {[styles.container, { backgroundColor: getTheme(this.props.theme, 'bg')}]}>
                <View style = { styles.topContainer }>
                    <View style={styles.titleContainer}>
                        <MainText>
                            <HeadingText style={[styles.title, { color : getTheme(this.props.theme, 'text')}]}>Chime</HeadingText>
                        </MainText>
                    </View>
                    <View style = {styles.button}>
                        <Button 
                            onPress = { this.openUrl }
                            textColor = {getTheme(this.props.theme, 'text')}
                            borderColor = {getTheme(this.props.theme, 'text')}
                        >
                            { (this.state.authMode === 'login' ? 'Click here to create an account.' : 'Click here to login.') }
                        </Button>  
                    </View>
                </View>
                { mainSection }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    topContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        width: '50%'
    },
	title: {
        color: 'white',
        textAlign: 'center'
	},

});


export default connect(mapStateToProps, mapDispatchToProps)(Auth);