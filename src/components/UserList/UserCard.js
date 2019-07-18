import React from 'react';
import { 
	View, 
	Text, 
	TouchableNativeFeedback, 
	Image, 
	StyleSheet,
	Dimensions
} from 'react-native';

import { getTheme } from '../../utility/theme';

class UserCard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selected : false,
			viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
		}
		Dimensions.addEventListener('change',this.updateStyles);
	}

	updateStyles = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
        })
    }

	componentWillUnmount() {
        /* Prevent memory leak */
        Dimensions.removeEventListener('change',this.updateStyles);
    }

	render() {
		return (
			<TouchableNativeFeedback 
				onPress = {()=> { this.props.onSelectUser(this.props.user)}}
				disabled = {this.props.disabled}
			>
				<View style = {[styles.card, { backgroundColor : getTheme('bg')} ]}>
					<View style = {styles.dpContainer}>
						<Image resizeMode="cover" source = { { uri : this.props.user.picture }} style = {styles.dp} ></Image>
					</View>
					<View>
						<Text style = {{color : getTheme('text')}}> { `${this.props.user.first} ${this.props.user.last}` }</Text>
					</View>
				</View>
			</TouchableNativeFeedback>
		)
	} 
}

export default UserCard;

const styles = StyleSheet.create({
	card: {
		height: 50,
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