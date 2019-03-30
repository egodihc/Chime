import React from 'react';
import { StyleSheet, View } from 'react-native';

import HeadingText from './src/components/UI/HeadingText/HeadingText';
import MainText from './src/components/UI/MainText/MainText';
import DefaultInput from './src/components/UI/DefaultInput/DefaultInput';

export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<MainText>
						<HeadingText style={styles.title}>Chime</HeadingText>
					</MainText>
				</View>
				<View style={styles.loginForm}>
					<DefaultInput 
						placeholder="Email"
						valid={true}
						touched={true}
					/>
					<DefaultInput 
						placeholder="Password"
						valid={true}
						touched={true}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#ADD8E6'
	},
	titleContainer: {
		paddingTop: 50,
		paddingBottom: 50
	},
	title: {
		color: 'white'
	},
	loginForm: {
		width: '80%',
		borderWidth: 1,
		borderColor: 'black'
	}
});
