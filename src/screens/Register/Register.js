import React from 'react';
import { ActivityIndicator, Dimensions, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import { register } from '../../store/actions/auth';
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
        register : (authData) => dispatch(register(authData)),
    };
}

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
            error: "",
            controls: {
                username: '',
                first: '',
                last: '',
                password: '',
                confPassword: ''
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
            this.props.onRegisterSuccess(data);
        }
        else if (this.props.auth.code === 2 && this.state.error === "") {
            this.setState({ error: 'Username already exists'});
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

    onRegister = () => {
        const authData = {
            first: this.state.controls.first.value,
            last: this.state.controls.last.value,
            username: this.state.controls.username.value,
            password: this.state.controls.password.value
        }
        const {first, last, username, password} = authData;
        if (!first || !last || !username || !password || !this.state.controls.confPassword.value) {
            this.setState({ error: "Please fill in all of the fields"});
        }
        else if (password !== this.state.controls.confPassword.value) {
            this.setState({ error: "Passwords do not match"});
        }
        else {
            this.setState({ error: ""});
            this.props.register(authData);
        }
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
            <Button onPress = { this.onRegister } style = {[styles.button, {backgroundColor: getColor(this.props.theme, 'special')}]} textColor = {'white'}>REGISTER</Button>

        if (this.props.isLoading) {
            mainButton = 
            <ActivityIndicator />
        }
 
        return (
            <View style = {[styles.container, {backgroundColor: getColor(this.props.theme, 'backgroundColor')}]}>
                {this.state.viewMode==='portrait'? 
                    <View style = {styles.titleContainer}>
                        <Text style = {{fontSize: 30, color: getColor(this.props.theme, 'color')}}>Chime</Text>
                    </View>
                    :
                    null
                }

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
                            <View style = {this.state.viewMode ==='portrait' ? null : styles.landscapeInputContainer}>
                                <View style = {this.state.viewMode === 'portrait' ? styles.portraitInputWrapper : styles.landscapeInputWrapper}>
                                    <DefaultInput 
                                        style = {styles.input} 
                                        placeholder = 'FIRST NAME'
                                        value = {this.state.controls.first.value}
                                        onChangeText = { (val) => {this.updateInputState('first', val)}}
                                        theme={this.props.theme}
                                        autoCapitalize = {'none'}
                                        autoCorrect = {false}
                                    />
                                </View>
                                <View style = {this.state.viewMode === 'portrait' ? styles.portraitInputWrapper : styles.landscapeInputWrapper}>
                                    <DefaultInput 
                                        style = {styles.input} 
                                        placeholder = 'LAST NAME'
                                        value = {this.state.controls.last.value}
                                        onChangeText = { (val) => {this.updateInputState('last', val)}}
                                        theme={this.props.theme}
                                        autoCapitalize = {'none'}
                                        autoCorrect = {false}
                                    />
                                </View>
                            </View>
                            <View style = {this.state.viewMode === 'portrait' ? styles.portraitInputContainer : styles.landscapeInputContainer}>
                                <View style = { this.state.viewMode === 'portrait' ? styles.portraitInputWrapper : styles.landscapeInputWrapper}>
                                    <DefaultInput 
                                        style = {styles.input} 
                                        placeholder = 'PASSWORD' 
                                        value = {this.state.controls.password.value}
                                        onChangeText = { (val) => {this.updateInputState('password', val)}}
                                        theme={this.props.theme}
                                        secureTextEntry
                                        />
                                </View>
                                <View style = {this.state.viewMode === 'portrait' ? styles.portraitInputWrapper : styles.landscapeInputWrapper}>
                                    <DefaultInput 
                                        style = {styles.input} 
                                        placeholder = 'CONFIRM PASSWORD' 
                                        value = {this.state.controls.confPassword.value}
                                        onChangeText = { (val) => {this.updateInputState('confPassword', val)}}
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
                            <Text style = {{color: getColor(this.props.theme, 'color')}}>Click here to login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

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
        paddingTop: 50,
        justifyContent: 'center'
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
    landscapeInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    portraitInputContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    portraitInputWrapper: {
        width: '100%'
    },
    landscapeInputWrapper: {
        width: '49%'
    }
});