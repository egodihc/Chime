import React from "react";
import { createAppContainer, createDrawerNavigator, createStackNavigator, createSwitchNavigator } from "react-navigation";
import MessengerScreen from './src/screens/Messenger/MessengerScreen';
import ProfileScreen from './src/screens/Profile/Profile';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';
import Startup from "./src/screens/Startup/Startup";
import UsersScreen from "./src/screens/UsersScreen/UsersScreen";

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