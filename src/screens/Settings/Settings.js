import React from 'react';
import { connect } from 'react-redux';
import { 
    View,
    StyleSheet
} from 'react-native';

import Button from '../../components/UI/Button/Button';
import { getTheme, getToggledTheme } from '../../utility/theme';

import { toggleTheme } from '../../store/actions/settings';
import { saveThemeToDB } from '../../utility/userDatabase';
import { updateStyles } from '../NavigationUtility/navigationUtility';

const mapStateToProps = (state) => {
    return {
        theme : state.settings.theme
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleTheme : () => dispatch(toggleTheme())
    }
}

class SettingsScreen extends React.Component {


    constructor(props) {
        super(props);
    }

    componentDidMount() {
        updateStyles("SettingsScreen", this.props.theme);
    }

    componentDidUpdate() {
        updateStyles("SettingsScreen", this.props.theme);
    }

    changeTheme = () => {
        this.props.toggleTheme();
        saveThemeToDB(getToggledTheme(this.props.theme))
        .then(() => { updateStyles("SettingsScreen", this.props.theme);});
    }

    render() {
        updateStyles("SettingsScreen", this.props.theme);
        return (
            <View style = {[styles.container, { backgroundColor : getTheme(this.props.theme,'bg')}]}>
                <View style={styles.titleContainer}>
                    <Button 
                    onPress = {this.changeTheme } 
                    textColor =  {getTheme(this.props.theme, 'text')}
                    borderColor = {getTheme(this.props.theme, 'text')}
                    backgroundColor = {getTheme(this.props.theme, 'bg')}
                    >{ (this.props.theme === 'DARK') ? 'Dark' : 'Light'}</Button>
                </View>
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
	title: {
        color: 'white',
        textAlign: 'center'
	},
	titleContainer: {
        paddingTop: 50,
        paddingBottom: 50
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);