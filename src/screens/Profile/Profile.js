import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    Image,
    StyleSheet
} from 'react-native';

import MainText from '../../components/UI/MainText/MainText';
import { getTheme } from '../../utility/theme';

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        theme: state.settings.theme
    };
}

class ProfileScreen extends React.Component {


    static navigatorStyle = {
        navBarButtonColor: 'black'
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }


    onNavigatorEvent = (event) => {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'settingsToggle') {
                this.props.navigator.showModal({
                    screen: "chime.SettingsScreen",
                    title: "Settings",
                    animationType: "slide-horizontal"
                })
            }
        }
    }


    render() {

        return (
            <View style = { styles.container }>
                <View style = { [styles.avatarBox, { borderColor: getTheme(this.props.theme)}] }>
                    <Image source = { { uri : this.props.user.picture } } style = { styles.previewImage } />
                </View>
                <MainText>
                    { `${this.props.user.first} ${this.props.user.last}` }
                </MainText>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    avatarBox: {
        margin: 5,
        borderWidth: 1,
        backgroundColor: '#eee',
        width: 200,
        height: 200
    },
    previewImage: {
        width: '100%',
        height: '100%'
    }
})


export default connect(mapStateToProps, null)(ProfileScreen);