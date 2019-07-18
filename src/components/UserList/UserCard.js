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
import { getLastOnline } from '../../utility/date';

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
	
	getLastSeen = () => {
		return getLastOnline(this.props.user.lastSeen);
	}

	componentWillUnmount() {
        /* Prevent memory leak */
        Dimensions.removeEventListener('change',this.updateStyles);
    }

	render() {
		return (
			<TouchableNativeFeedback onPress = {()=> { this.props.onSelectUser(this.props.user)}}>
				<View style = {[styles.card, { backgroundColor : getTheme('bg')} ]}>
					<View style = {styles.dpContainer}>
							<Image resizeMode="cover" source = { { uri : this.props.user.picture }} style = {styles.dp} ></Image>
						</View>
						<View style = {styles.textContainer}>
							<Text style = {styles.text}> { `${this.props.user.first} ${this.props.user.last}` }</Text>
						</View>
					<View style = {styles.lastSeenContainer}>
						<Text style = {styles.text}>{this.getLastSeen()}</Text>			
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
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	textContainer: {
		flex: 1
	},
	text: {
		color : 'white'
	},
	dpContainer: {
		width: 50
	},
	lastSeenContainer: {
		width: '10%'
	},
	dp: {
		width: '100%',
		height: '100%'
	}
})