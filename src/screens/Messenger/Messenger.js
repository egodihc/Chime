import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    Text
} from 'react-native';



const mapStateToProps = (state) => {
    return {

    };
}

const mapDispatchToProps = (dispatch) => {

    return {
        
    };
}


class MessengerScreen extends React.Component {


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
            <View>
                <Text>
                    
                </Text>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessengerScreen);