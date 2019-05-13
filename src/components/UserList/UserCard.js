import React from 'react';

import { 
	View, 
	Text, 
	TouchableNativeFeedback, 
	Image, 
	StyleSheet
} from 'react-native';

import { connect } from 'react-redux';
import { getDefaultTheme } from '../../utility/theme';

class UserCard extends React.Component {

	
	constructor(props) {

		super(props);

		this.state = {
			selected : false
		}
	}
	
	
	render() {
        return (

				<TouchableNativeFeedback onPress = {()=> { this.props.onSelectUser(this.props.user)}}>
					<View style = {styles.card}>
						<View style = {styles.dpContainer}>
							<Image resizeMode="cover" source = { { uri : this.props.user.picture }} style = {styles.dp} ></Image>
						</View>
						<View>
							<Text> { `${this.props.user.first} ${this.props.user.last}` }</Text>
						</View>
					</View>
				</TouchableNativeFeedback>
        )
	} 
}


const styles = StyleSheet.create({
    card: {
			height: '10%',
			borderColor: getDefaultTheme(),
			borderWidth: 1,
			width: '100%',
			flexDirection: 'row'
		},
		dpContainer: {
			width: 50
		},
		dp: {
			width: '100%',
			height: '100%'
	}
})


export default connect(null, null)(UserCard);