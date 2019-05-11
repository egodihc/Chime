import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    Image,
    StyleSheet
} from 'react-native';

import MainText from '../../components/UI/MainText/MainText';

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    };
}

const mapDispatchToProps = (dispatch) => {

    return {
        
    };
}


class ProfileScreen extends React.Component {


    static navigatorStyle = {
        navBarButtonColor: '#ADD8E6'
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent = (event) => {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'sideDrawerToggle') {
                this.props.navigator.toggleDrawer({
                    side: 'left',
                    animated: true,
                    to: 'open'
                });
            }
        }
    }

    render() {

        return (
            <View style = { styles.container }>
                <View style = { styles.avatarBox }>
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
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '80%',
        height: 150
    },
    previewImage: {
        width: '100%',
        height: '100%'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);