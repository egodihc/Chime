import React from "react";
import { createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator } from "react-navigation";
import UsersScreen from "./src/screens/UsersScreen/UsersScreen";
import MessengerScreen from './src/screens/Messenger/MessengerScreen';
import { getTheme } from "./src/utility/theme";
import SideDrawer from './src/screens/SideDrawer/SideDrawer';
import Startup from "./src/screens/Startup/Startup";

const DrawerNavigator = createDrawerNavigator(
	{
		UsersScreen
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
				title: 'CONTACTS',
				headerTintColor: getTheme('text')
			}
		},
		MessengerScreen:  {
			screen: MessengerScreen,
			navigationOptions: {
				headerTintColor: getTheme('text')
			}
		}
	},
	{
		initialRouteName: 'UsersScreen',
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: getTheme('bg')
			}
		}
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