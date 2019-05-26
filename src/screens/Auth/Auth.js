import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    Dimensions,
    StyleSheet, 
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


const mapStateToProps = (state) => {
    return {
        isLoading: state.ui.isLoading,
        isLoggedIn: state.auth.isLoggedIn,
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
            this.props.setTransition();
            startMainTabs();
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
                <View style={styles.titleContainer}>
                    <MainText>
                        <HeadingText style={[styles.title, { color : getTheme(this.props.theme, 'text')}]}>Chime</HeadingText>
                    </MainText>
                </View>
                <View style = {styles.button}>
                    <Button 
                        onPress = { this.switchMode }
                        textColor = {getTheme(this.props.theme, 'text')}
                        borderColor = {getTheme(this.props.theme, 'text')}
                    >
                        { (this.state.authMode === 'login' ? 'Click here to create an account.' : 'Click here to login.') }
                    </Button>  
                </View>
                { mainSection }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: '50%'
    },
	title: {
        color: 'white',
        textAlign: 'center'
	},
	titleContainer: {
        paddingTop: 50,
        paddingBottom: 50
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Auth);