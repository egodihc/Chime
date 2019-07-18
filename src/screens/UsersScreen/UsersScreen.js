import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    StyleSheet
} from 'react-native';

import UserList from '../../components/UserList/UserList';
import { getTheme } from '../../utility/theme';
import { setTarget } from '../../store/actions/messenger';

const mapDispatchToProps = (dispatch) => {
    return {
        setTarget: (target) => dispatch(setTarget(target))
    }
}

class UsersScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    /* Passes target as props to messenger screen */
    onSelectUser = (user) => {
        this.props.setTarget({
            ...user,
            isGroup: false
        });
        this.props.navigation.navigate('MessengerScreen');
    }


    render() {
        return (
            <View style = {styles.container}>
                <UserList onSelectUser = {this.onSelectUser}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: getTheme('bg')
    }
})

export default connect(null, mapDispatchToProps)(UsersScreen);