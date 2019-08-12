import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    StyleSheet
} from 'react-native';

import UserList from '../../components/UserList/UserList';
import { getTheme } from '../../utility/theme';
import { loadTarget } from '../../store/actions/messenger';
import ContactNavBar from './ContactNavBar';

const mapDispatchToProps = (dispatch) => {
    return {
        loadTarget: (target) => dispatch(loadTarget(target))
    }
}

class UsersScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <ContactNavBar toggleDrawer = {navigation.getParam('toggleDrawer')} />
    });
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.navigation.setParams({ toggleDrawer: this.toggleDrawer });
    }

    toggleDrawer = () => {
        this.props.navigation.toggleDrawer();
    }

    /* Passes target as props to messenger screen */
    onSelectUser = (user) => {
        this.props.loadTarget(user);
        this.props.navigation.push('MessengerScreen');
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