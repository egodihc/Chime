import React from 'react';
import { connect } from 'react-redux';
import { 
	View, 
	Text, 
	TouchableNativeFeedback, 
	Image, 
	StyleSheet,
	Dimensions
} from 'react-native';

import { getColor } from '../../utility/theme';
import { getLastOnline } from '../../utility/date';

const mapStateToProps = (state) => {
	return {
		theme: state.theme.theme
	}
}

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
	
  wasRecentlyOnline = (lastSeen) => {
		const timeNow = (new Date()).getTime();
		return (timeNow - (lastSeen) <= 55*1000);
	}
	
	getLastSeen = () => {
		if (this.wasRecentlyOnline(this.props.user.lastSeen)) {
			return <View style = {styles.activityIndicator}></View>;
		}
		else {
			return <Text style = {{color: getColor(this.props.theme, 'color')}}>{getLastOnline(this.props.user.lastSeen)}</Text>;	
		}
	}

	componentWillUnmount() {
		/* Prevent memory leak */
		Dimensions.removeEventListener('change',this.updateStyles);
	}

	render() {
		const activity = this.getLastSeen();
		
		return (
			<TouchableNativeFeedback onPress = {()=> { this.props.onSelectUser(this.props.user)}}>
				<View style = {[styles.card, { backgroundColor : getColor(this.props.theme, 'backgroundColor')} ]}>
					<View style = {styles.dpContainer}>
							<Image resizeMode="cover" source = { { uri : this.props.user.picture }} style = {styles.dp} ></Image>
						</View>
						<View style = {styles.textContainer}>
							<Text style = {{color: getColor(this.props.theme, 'color')}}> { `${this.props.user.first} ${this.props.user.last}` }</Text>
						</View>
					<View style = {styles.lastSeenContainer}>
						{activity}
					</View>
				</View>
			</TouchableNativeFeedback>
		)
	} 
}

export default connect(mapStateToProps, null)(UserCard);

const styles = StyleSheet.create({
	card: {
		height: 50,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	textContainer: {
		flex: 1,
		paddingLeft: 5
	},
	dpContainer: {
		width: 50
	},
	lastSeenContainer: {
		width: '15%',
		alignItems: 'center'
	},
	activityIndicator: {
		height: 8,
		width: 8,
		borderRadius: 8/2,
		backgroundColor: '#42b72a'
	},
	dp: {
		width: '100%',
		height: '100%'
	}
})