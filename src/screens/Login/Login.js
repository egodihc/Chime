import React from 'react';
import { connect } from 'react-redux';

import { View, Dimensions, StyleSheet, ActivityIndicator, Text, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import Button from '../../components/UI/Button/Button';

import { login } from '../../store/actions/auth';
import { getColor } from '../../utility/theme';

const mapStateToProps = (state) => {
    return {
        isLoading: state.ui.isLoading,
        auth: state.auth,
        user: state.auth.user,
        theme: state.theme.theme
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        login : (authData) => dispatch(login(authData)),
    };
}


class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
            authMode: 'login',
            error: "",
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
        else if (this.props.auth.code === 1 && this.state.error === "") {
            this.setState({ error: 'Incorrect username/password'});
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
        this.setState({ error: ""});
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
            <Button onPress = { this.onLogin } style = {[styles.button, {backgroundColor: getColor(this.props.theme, 'special')}]} textColor = {'white'}>LOGIN</Button>

        if (this.props.isLoading) {
            mainButton = 
            <ActivityIndicator />
        }
 
        return (
            <View style = {[styles.container, {backgroundColor: getColor(this.props.theme, 'backgroundColor')}]}>
                <View style = {this.state.viewMode === 'portrait' ? styles.titleContainer: null}>
                    <Text style = {{fontSize: 30, color: getColor(this.props.theme, 'color')}}>Chime</Text>
                </View>
                <View style = {styles.inputContainerTop}>
                    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
                        <View style = {styles.inputContainer}>
                            <DefaultInput 
                                style = {styles.input} 
                                placeholder = 'USERNAME'
                                value = {this.state.controls.username.value}
                                onChangeText = { (val) => {this.updateInputState('username', val)}}
                                theme={this.props.theme}
                                autoCapitalize = {'none'}
                                autoCorrect = {false}
                                />
                            <View style = {this.state.viewMode === 'portrait' ? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
                                <View style = {styles.passwordWrapper}>
                                    <DefaultInput 
                                        style = {styles.input} 
                                        placeholder = 'PASSWORD' 
                                        value = {this.state.controls.password.value}
                                        onChangeText = { (val) => {this.updateInputState('password', val)}}
                                        theme={this.props.theme}
                                        secureTextEntry
                                        />
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style = {this.state.viewMode === 'portrait' ? styles.portraitButtonWrapper: styles.landscapeButtonWrapper} > 
                        { mainButton }
                        {(this.state.error !== "")?
                            <Text style = {{color: 'red'}}>{this.state.error}</Text>
                            :
                            null
                            }
                    </View>
                    <View style = {this.state.viewMode === 'portrait'? styles.portraitOther: styles.landscapeOther}>
                        <TouchableOpacity onPress ={this.props.switchAuthMode}>
                            <Text style = {{color: getColor(this.props.theme, 'color')}}>Click here to register</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    inputContainerTop: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: '80%'
    },
    titleContainer: {
        paddingTop: 50
    },
    portraitButtonWrapper: {
        marginTop: 30,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    landscapeButtonWrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    portraitOther: {
        marginTop: 30
    },
    landscapeOther: {
        marginTop: 10
    },
    button: {
        padding: 15,
        borderRadius: 30,
        width: '80%',
        marginBottom: 5,
        borderWidth: 0
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
    passwordWrapper: {
        width: '100%'
    }
});