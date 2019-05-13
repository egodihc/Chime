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
import { getDefaultTheme } from '../../utility/theme';


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


class Settings extends React.Component {


    constructor(props) {
        super(props);
        
        this.state = {
            viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
            authMode: 'login'
        }

        Dimensions.addEventListener('change',this.updateStyles);
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
                        <HeadingText style={styles.title}>Settings</HeadingText>
                    </MainText>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
		backgroundColor: getDefaultTheme()
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


export default connect(mapStateToProps, mapDispatchToProps)(Settings);