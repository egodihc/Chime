import React from 'react';

import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';


import AuthScreen from './src/screens/Auth/Auth';
import UsersScreen from './src/screens/UsersScreen/UsersScreen';
import ProfileScreen from './src/screens/Profile/Profile';
import MessengerScreen from './src/screens/Messenger/MessengerScreen';
import SettingsScreen from './src/screens/Settings/Settings';
import OtherProfile from './src/screens/OtherProfile/OtherProfile';
import StartScreen from './src/screens/Startup/Startup';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';



const store = configureStore();

// import ProfileButton from './src/components/UI/ProfileButton/ProfileButton';
// Navigation.registerComponent("chime.ProfileButton", () => ProfileButton);

/* Register screens */
Navigation.registerComponent("chime.StartScreen", () => (props) => (
	<Provider store = {store}>
		<StartScreen />
	</Provider>
), () => StartScreen);

Navigation.registerComponent("chime.AuthScreen", () => (props) => (
	<Provider store = {store}>
		<AuthScreen />
	</Provider>
), () => AuthScreen);


Navigation.registerComponent("chime.UsersScreen", () => (props) => (
	<Provider store = {store}>
		<UsersScreen />
	</Provider>
), () => UsersScreen);

Navigation.registerComponent("chime.ProfileScreen", () => (props) => (
	<Provider store = {store}>
		<ProfileScreen />
	</Provider>
), () => ProfileScreen);

Navigation.registerComponent("chime.MessengerScreen", () => (props) => (
	<Provider store = {store}>
		<MessengerScreen { ...props} />
	</Provider>
), () => MessengerScreen);

Navigation.registerComponent("chime.SettingsScreen", () => (props) => (
	<Provider store = {store}>
		<SettingsScreen />
	</Provider>
), () => SettingsScreen);

Navigation.registerComponent("chime.OtherProfile", () => (props) => (
	<Provider store = {store}>
		<OtherProfile />
	</Provider>
), () => OtherProfile);

Navigation.registerComponent("chime.SideDrawer", () => (props) => (
	<Provider store = {store}>
		<SideDrawer />
	</Provider>
), () => SideDrawer);



// Navigation.registerComponent("chime.AuthScreen", () => AuthScreen, store, Provider);
// Navigation.registerComponent("chime.UsersScreen", () => UsersScreen, store, Provider);
// Navigation.registerComponent("chime.ProfileScreen", () => ProfileScreen, store, Provider);
// Navigation.registerComponent("chime.MessengerScreen", () => MessengerScreen, store, Provider);
// Navigation.registerComponent("chime.SettingsScreen", () => SettingsScreen, store, Provider);
// Navigation.registerComponent("chime.OtherProfile", () => OtherProfile, store, Provider);




/* Start app */
Navigation.setRoot({
	root: {
		stack: {
			id: 'AppStack',
			children: [{
				component: {
					name: 'chime.StartScreen'
				}
			}]
		}
	}
});