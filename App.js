import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import LoginScreen from './src/screens/Login/Login';

import configureStore from './src/store/configureStore';

import MessengerScreen from './src/screens/Messenger/Messenger';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';
import ProfileScreen from './src/screens/Profile/Profile';

const store = configureStore();

/* Register screens */
Navigation.registerComponent("chime.LoginScreen", () => LoginScreen, store, Provider);
// Navigation.registerComponent("chidme.MessengerScreen", () => MessengerScreen, store, Provider);
// Navigation.registerComponent("chime.OtherScreen", () => OtherScreen, store, Provider);

Navigation.registerComponent("chime.MessengerScreen", () => MessengerScreen, store, Provider);
Navigation.registerComponent("chime.ProfileScreen", () => ProfileScreen, store, Provider);

Navigation.registerComponent("chime.SideDrawer", () => SideDrawer, store, Provider);

/* Start app */
Navigation.startSingleScreenApp({

	screen : {
		screen: "chime.LoginScreen",
		title : "Login"
	}
});