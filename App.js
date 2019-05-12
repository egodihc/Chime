import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import configureStore from './src/store/configureStore';

import AuthScreen from './src/screens/Auth/Auth';
import UsersScreen from './src/screens/UsersScreen/UsersScreen';
import ProfileScreen from './src/screens/Profile/Profile';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';
import Messenger from './src/screens/Messenger/Messenger';



const store = configureStore();

/* Register screens */
Navigation.registerComponent("chime.AuthScreen", () => AuthScreen, store, Provider);
Navigation.registerComponent("chime.UsersScreen", () => UsersScreen, store, Provider);
Navigation.registerComponent("chime.ProfileScreen", () => ProfileScreen, store, Provider);
Navigation.registerComponent("chime.SideDrawer", () => SideDrawer, store, Provider);

Navigation.registerComponent("chime.Messenger", () => Messenger, store, Provider);


/* Start app */
Navigation.startSingleScreenApp({

	screen : {
		screen: "chime.AuthScreen",
		title : "Login"
	}
});