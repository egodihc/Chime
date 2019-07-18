import React from "react";
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from "react-navigation";
import LoginScreen from "./src/screens/Login/Login";
import UsersScreen from "./src/screens/UsersScreen/UsersScreen";
import MessengerScreen from './src/screens/Messenger/MessengerScreen';
import ProfileScreen from './src/screens/Profile/Profile';
import { getTheme } from "./src/utility/theme";
import { THEME } from "./src/store/constants";
import Startup from "./src/screens/Startup/Startup";

const UsersTab = createStackNavigator(
	{
		UsersScreen: {
			screen: UsersScreen,
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
  
const MainTab = createStackNavigator(
	{
		Contacts: UsersTab
	},
	{
		defaultNavigationOptions: {
			header: null
		}
	}
);

const RootNavigator = createSwitchNavigator(
	{
		Startup: Startup,
		MainTab: MainTab
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