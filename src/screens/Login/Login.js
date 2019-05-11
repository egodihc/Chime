import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    Dimensions,
    StyleSheet, 
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import Button from '../../components/UI/Button/Button';
import startMainTabs from '../mainTabs/startMainTabs';

import validate from '../../utility/validation';

// import { tryAuth } from '../../store/actions/index';

const mapStateToProps = (state) => {
    return {

    };
}

const mapDispatchToProps = (dispatch) => {

    return {
        
    };
}


class LoginScreen extends React.Component {


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
        startMainTabs();
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

    switchMode = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                authMode: prevState.authMode === 'login' ? 'signUp' : 'login'
            }
        })
    }

    render() {

        let headingText = null;
        let signUpContent = null;

        if (this.state.authMode === 'signUp') {
            signUpContent = 
            <View style = { this.state.viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper }>
                <DefaultInput 
                    style = {styles.input} 
                    placeholder = 'Confirm password' 
                    value = {this.state.controls.confirmPassword.value}
                    onChangeText = { (val) => {this.updateInputState('confirmPassword', val)}}
                    valid = {this.state.controls.confirmPassword.valid}
                    touched = {this.state.controls.confirmPassword.touched}
                    secureTextEntry
                    />
            </View>

        }

        if (this.state.viewMode === 'portrait') {
            headingText = 
                <MainText>
                    <HeadingText>
                        Welcome!
                    </HeadingText>
                </MainText>
        }
 
        return (


			<View style = {styles.container}>
				<View style={styles.titleContainer}>
					<MainText>
						<HeadingText style={styles.title}>Chime</HeadingText>
					</MainText>
				</View>
				<Button 
					onPress = { this.switchMode }
					color = 'transparent'
				>
					{ (this.state.authMode === 'login' ? 'Sign up' : 'Login') }
				</Button>

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
							{ signUpContent }
						</View>

					</View>
				</TouchableWithoutFeedback>


				
				<Button 
					onPress = { this.onLogin }
					color = 'transparent'
				>
					{ (this.state.authMode==='signUp') ? 'Create account' : 'Login' }
				</Button>

				<Button 
					onPress = { this.onLogin }
					color = 'transparent'
				>
					Skip
				</Button>
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
    backgroundImage: {
        width: '100%',
        flex: 1
	},
	title: {
		color: 'white'
	},
	titleContainer: {
		paddingBottom: 50
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);