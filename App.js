import React from "react";
import { createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator } from "react-navigation";
import UsersScreen from "./src/screens/UsersScreen/UsersScreen";
import MessengerScreen from './src/screens/Messenger/MessengerScreen';
import { getTheme } from "./src/utility/theme";
import SideDrawer from './src/screens/SideDrawer/SideDrawer';
import Startup from "./src/screens/Startup/Startup";
import ProfileScreen from './src/screens/Profile/Profile';

const UserTab = createStackNavigator(
	{
		UsersScreen: {
			screen: UsersScreen,
			navigationOptions: {
				header: null
			}
		}
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
				title: 'CONTACTS',
				headerTintColor: getTheme('text')
			}
		},
		MessengerScreen:  {
			screen: MessengerScreen,
			navigationOptions: {
				headerTintColor: getTheme('text')
			}
		},
		ProfileScreen: {
			screen: ProfileScreen,
			navigationOptions: {
				title: 'My profile',
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