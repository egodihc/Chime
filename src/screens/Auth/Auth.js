import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { getColor } from '../../utility/theme';
import Login from '../Login/Login';
import Register from '../Register/Register';

const mapStateToProps = (state) => {
    return {
        theme: state.theme.theme
    }
}

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authMode: 'login'
        }
    }

    onAuthSuccess = (user) => {
        this.props.onLoginSuccess(user);
    }

    toggleAuth = () => {
        this.setState({authMode: (this.state.authMode==='login') ? 'register' : 'login'});
    }

    render() {
        const mainContent = (this.state.authMode === 'login') ? 
            <Login onLoginSuccess = {this.onAuthSuccess} switchAuthMode = {this.toggleAuth}/> 
            :
            <Register onRegisterSuccess={this.onAuthSuccess} switchAuthMode = {this.toggleAuth}/>;
        return (
            <View style = {[styles.container, {backgroundColor: getColor(this.props.theme, 'backgroundColor')}]}>
                {mainContent}
            </View>
        )
    }
}

export default connect(mapStateToProps, null)(Auth);

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})