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
import Button from '../../components/UI/Button/Button';
import validate from '../../utility/validation';

import { login } from '../../store/actions/auth';
import { getTheme } from '../../utility/theme';

const mapStateToProps = (state) => {
    return {
        isLoading: state.ui.isLoading,
        theme: state.settings.theme
    };
}

const mapDispatchToProps = (dispatch) => {

    return {
        login : (authData) => dispatch(login(authData))
    };
}


class Login extends React.Component {


    constructor(props) {
        super(props);
        
        this.state = {
            viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
            authMode: 'login',
            controls: {
                email: {
                    value: '',
                    valid: false,
                    validationRules: {
                        isEmail: true
                    },
                    touched: false
                },
                password: {
                    value: '',
                    valid: false,
                    validationRules: {
                        minLength: 6
                    },
                    touched: false
                },
                confirmPassword: {
                    value: '',
                    valid: false,
                    validationRules: {
                        equalTo: 'password'
                    },
                    touched: false
                }
            }
        }

        Dimensions.addEventListener('change',this.updateStyles);
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
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        }
        this.props.login(authData);
    }


    /* Login with default account for testing */
    skip = () => {
        const authData = {
            email: 'a',
            password: 'a'
        }
        this.props.login(authData);

    }

    
    updateInputState = (key, value) => {

        /* If the equalTo rule exists */
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            }
        }

        if (key === 'password') {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            }
        }

        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: key === 'password' ? 
                            validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValue) 
                            : 
                            prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                        touched: true
                    }
                }
            }
        })
    }
    

    render() {


        let mainButton = 
        <View>
            <Button 
                onPress = { this.onLogin }
                color = 'transparent'
                textColor = {getTheme(this.props.theme, 'text')}
                borderColor = {getTheme(this.props.theme, 'text')}
            >
                Login
            </Button>
        
            <Button 
            onPress = { this.skip }
            color = 'transparent'
            textColor = {getTheme(this.props.theme, 'text')}
            borderColor = {getTheme(this.props.theme, 'text')}
            >
                Login with default
            </Button>
        </View>



        if (this.props.isLoading) {
            mainButton = <ActivityIndicator />
        }
 
        return (
            <View style = {styles.container}>
				<TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
					<View style = {styles.inputContainer}>
						<DefaultInput 
							style = {styles.input} 
							placeholder = 'Email'
							value = {this.state.controls.email.value}
							onChangeText = { (val) => {this.updateInputState('email', val)}}
							valid = {this.state.controls.email.valid}  
							touched = {this.state.controls.email.touched}
							autoCapitalize = {'none'}
							autoCorrect = {false}
							keyboardType = {'email-address'}
							/>
						<View style = { (this.state.viewMode === 'portrait' || this.state.authMode === 'login')
							? styles.portraitPasswordContainer 
							: styles.landscapePasswordContainer }>
							<View style = { this.state.viewMode === 'portrait' || this.state.authMode === 'login'
								? styles.portraitPasswordWrapper 
								: styles.landscapePasswordWrapper }>
								<DefaultInput 
									style = {styles.input} 
									placeholder = 'Password' 
									value = {this.state.controls.password.value}
									onChangeText = { (val) => {this.updateInputState('password', val)}}
									valid = {this.state.controls.password.valid} 
									touched = {this.state.controls.password.touched}
									secureTextEntry
									/>
							</View>
						</View>

					</View>
				</TouchableWithoutFeedback>

                { mainButton }

            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    inputContainer: {
        width: '80%',
        margin: 10
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#bbb'
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
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);