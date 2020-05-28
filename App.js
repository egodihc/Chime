import React from "react";
import { createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator } from "react-navigation";
import UsersScreen from "./src/screens/UsersScreen/UsersScreen";
import MessengerScreen from './src/screens/Messenger/MessengerScreen';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';
import Startup from "./src/screens/Startup/Startup";
import ProfileScreen from './src/screens/Profile/Profile';

const UserTab = createStackNavigator(
	{
		UsersScreen
	}
)

const DrawerNavigator = createDrawerNavigator(
	{
		UserTab
	},
	{
		contentComponent: SideDrawer
	}
	
)

const UsersTab = createStackNavigator(
	{
		UsersScreen: {
			screen: DrawerNavigator,		
			navigationOptions: {
				header:null,
			}
		},
		MessengerScreen:  {
			screen: MessengerScreen
		},
		ProfileScreen: {
			screen: ProfileScreen,
			navigationOptions: {
				title: 'My profile'
			}
		}
	},
	{
		initialRouteName: 'UsersScreen'
	}
);



const RootNavigator = createSwitchNavigator(
	{
		Startup: Startup,
		MainTab: UsersTab
	},
	{
		initialRouteName: 'Startup'
	}
)

const AppContainer = createAppContainer(RootNavigator);

export default class App extends React.Component {
	render() {
		return <AppContainer />;
	}
}