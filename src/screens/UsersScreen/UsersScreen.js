import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    StyleSheet
} from 'react-native';

import UserList from '../../components/UserList/UserList';
import { getColor } from '../../utility/theme';
import { loadTarget } from '../../store/actions/messenger';
import ContactNavBar from './ContactNavBar';

const mapDispatchToState = (state) => {
    return {
        theme: state.theme.theme
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadTarget: (target) => dispatch(loadTarget(target))
    }
}

class UsersScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <ContactNavBar openDrawer = {navigation.getParam('openDrawer')} />
    });
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.navigation.setParams({ openDrawer: this.openDrawer });
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    /* Passes target as props to messenger screen */
    onSelectUser = (user) => {
        this.props.loadTarget(user);
        this.props.navigation.push('MessengerScreen');
    }


    render() {
        return (
            <View style = {[styles.container, { backgroundColor: getColor(this.props.theme, 'backgroundColor')}]}>
                <UserList onSelectUser = {this.onSelectUser}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default connect(mapDispatchToState, mapDispatchToProps)(UsersScreen);