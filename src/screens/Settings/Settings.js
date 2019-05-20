import React from 'react';
import { connect } from 'react-redux';
import { 
    View,
    StyleSheet
} from 'react-native';

import Button from '../../components/UI/Button/Button';
import { getTheme } from '../../utility/theme';

import { setTheme } from '../../store/actions/settings';


const mapStateToProps = (state) => {
    return {
        theme : state.settings.theme
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTheme : (theme) => dispatch(setTheme(theme))
    }
}

class Settings extends React.Component {


    constructor(props) {
        super(props);
    }

    changeTheme = () => {
        this.props.setTheme('orange');
    }

    render() {

        return (
            <View style = {[styles.container, { backgroundColor: getTheme(this.props.theme) }] }>
                <View style={styles.titleContainer}>
                    <Button onPress = {this.changeTheme }>Switch theme</Button>
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


export default connect(mapStateToProps, mapDispatchToProps)(Settings);