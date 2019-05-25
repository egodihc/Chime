import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import configureStore from './src/store/configureStore';

import AuthScreen from './src/screens/Auth/Auth';
import UsersScreen from './src/screens/UsersScreen/UsersScreen';
import ProfileScreen from './src/screens/Profile/Profile';
import MessengerScreen from './src/screens/Messenger/Messenger';
import SettingsScreen from './src/screens/Settings/Settings';
import ViewProfileScreen from './src/screens/ViewProfileScreen/ViewProfileScreen';


const store = configureStore();

// import ProfileButton from './src/components/UI/ProfileButton/ProfileButton';
// Navigation.registerComponent("chime.ProfileButton", () => ProfileButton);

/* Register screens */
Navigation.registerComponent("chime.AuthScreen", () => AuthScreen, store, Provider);
Navigation.registerComponent("chime.UsersScreen", () => UsersScreen, store, Provider);
Navigation.registerComponent("chime.ProfileScreen", () => ProfileScreen, store, Provider);
Navigation.registerComponent("chime.MessengerScreen", () => MessengerScreen, store, Provider);
Navigation.registerComponent("chime.SettingsScreen", () => SettingsScreen, store, Provider);
Navigation.registerComponent("chime.ViewProfileScreen", () => ViewProfileScreen, store, Provider);




/* Start app */
Navigation.startSingleScreenApp({

	screen : {
		screen: "chime.AuthScreen",
		title : "Login"
	}
});