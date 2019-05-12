import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    Dimensions,
    StyleSheet, 
    ActivityIndicator,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import Button from '../../components/UI/Button/Button';
import startMainTabs from '../mainTabs/startMainTabs';
import validate from '../../utility/validation';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { login } from '../../store/actions/auth';
import { SET_TRANSITIONED } from '../../store/constants';


const mapStateToProps = (state) => {
    return {
        isLoading: state.ui.isLoading,
        isLoggedIn: state.auth.isLoggedIn,
        alreadyTransitioned : state.auth.alreadyTransitioned
    };
}

const mapDispatchToProps = (dispatch) => {

    return {
        login : (authData) => dispatch(login(authData)),
        setTransition : () => dispatch({ type : SET_TRANSITIONED })
    };
}


class LoginScreen extends React.Component {


    constructor(props) {
        super(props);
        
        this.state = {
            viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
            authMode: 'login'
        }

        Dimensions.addEventListener('change',this.updateStyles);
    }

    componentDidUpdate() {
        if (this.props.isLoggedIn && !this.props.alreadyTransitioned) {
            this.props.setTransition();
            startMainTabs();
        }
    }

    componentWillUnmount() {
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
            <View style = {styles.container}>
                <View style={styles.titleContainer}>
                    <MainText>
                        <HeadingText style={styles.title}>Chime</HeadingText>
                    </MainText>
                </View>
                <View style = {styles.button}>
                    <Button 
                        onPress = { this.switchMode }
                        color = 'yellow'
                    >
                        { (this.state.authMode === 'login' ? 'Don\'t have an account? Click here to create one.' : 'Already have an account? Click here to login') }
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
        alignItems: 'center',
		backgroundColor: '#ADD8E6'
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


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);