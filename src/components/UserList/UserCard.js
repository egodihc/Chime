import React from 'react';

import { View, Text } from 'react-native';

import { connect } from 'react-redux';

class UserCard extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			selected : false
		}
	}


	render() {
        return (
            <View>
                <Text> { `${this.props.user.first} ${this.props.user.last}` }</Text>
            </View>
        )
	} 
}

export default connect(null, null)(UserCard);