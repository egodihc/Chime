import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    Dimensions,
    StyleSheet, 
    ActivityIndicator,
    Keyboard,
    Image,
    TouchableWithoutFeedback
} from 'react-native';

import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import Button from '../../components/UI/Button/Button';

import { login } from '../../store/actions/auth';
import { getTheme } from '../../utility/theme';

const mapStateToProps = (state) => {
    return {
        isLoading: state.ui.isLoading,
        auth: state.auth,
        user: state.auth.user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        login : (authData) => dispatch(login(authData)),
    };
}


class LoginScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
            authMode: 'login',
            controls: {
                username: '',
                password: ''
            }
        }
        Dimensions.addEventListener('change',this.updateStyles);
    }

    componentDidUpdate() {
        /* Condition prevents this lifecycle hook from retriggering itself */
        if (this.props.auth.code === 0) {
            const data = {
                ...this.props.user,
                password: this.props.auth.authData.password
            }
            this.props.onLoginSuccess(data);
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

    onLogin = () => {
        const authData = {
            username: this.state.controls.username.value,
            password: this.state.controls.password.value
        }
        this.props.login(authData);
    }

    updateInputState = (key, value) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: { value: value }
                }
            }
        })
    }

    render() {
        let mainButton = 
            <View style = { (this.state.viewMode === 'portrait') ? styles.portraitButtonWrapper : styles.landscapeButtonWrapper } > 
                <Button onPress = { this.onLogin } style = {styles.button} textColor = {'white'}>LOGIN</Button>
            </View>

        if (this.props.isLoading) {
            mainButton = <ActivityIndicator />
        }
 
        return (
            <View style = {styles.container}>
                <View style = {styles.titleContainer}>
                    <MainText>
                        <HeadingText style={styles.title}>Chime</HeadingText>
                    </MainText>
                </View>
                <View style = {styles.inputContainerTop}>
                    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
                        <View style = {styles.inputContainer}>
                            <DefaultInput 
                                style = {styles.input} 
                                placeholder = 'USERNAME'
                                value = {this.state.controls.username.value}
                                onChangeText = { (val) => {this.updateInputState('username', val)}}
                                autoCapitalize = {'none'}
                                autoCorrect = {false}
                                />
                            <View style = { (this.state.viewMode === 'portrait' || this.state.authMode === 'login')
                                ? styles.portraitPasswordContainer 
                                : styles.landscapePasswordContainer }>
                                <View style = { this.state.viewMode === 'portrait' || this.state.authMode === 'login'
                                    ? styles.portraitPasswordWrapper 
                                    : styles.landscapePasswordWrapper }>
                                    <DefaultInput 
                                        style = {styles.input} 
                                        placeholder = 'PASSWORD' 
                                        value = {this.state.controls.password.value}
                                        onChangeText = { (val) => {this.updateInputState('password', val)}}
                                        secureTextEntry
                                        />
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    { mainButton }
                </View>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333'
    },
    inputContainerTop: {
        flex: 3,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '80%'
    },
    titleContainer: {
        flex: 2,
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        color: 'white'
	},
    landscapeButtonWrapper: {
        flexDirection: 'row'
    },
    portraitButtonWrapper: {
        marginTop: 30,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    button: {
        padding: 15,
        borderRadius: 30,
        backgroundColor: getTheme(null),
        width: '80%',
        marginBottom: 5
    },

    inputContainer: {
        width: '100%'
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#bbb',
        borderRadius: 10,
        padding: 10,
        color: 'black'
    },
    landscapePasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    portraitPasswordContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    landscapePasswordWrapper: {
        width: '45%',
    },
    portraitPasswordWrapper: {
        width: '100%',
    },

});