import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getDefaultTheme } from '../../utility/theme';

const startTabs = () => {

    /* Execute async functions which return the icons and THEN register tabs */
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? 'md-send' : 'md-send', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-person' : 'md-person', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30)
    ])
    .then(
        (icons) => {
            Navigation.startTabBasedApp({

                tabs: [
                    {
                        screen: "chime.UsersScreen",
                        label: "Messenger",
                        title: "Messenger",
                        icon: icons[0],
                        navigatorButtons: {
                            leftButtons: [
                                {
                                    icon: icons[2],
                                    title: 'Menu',
                                    id: 'sideDrawerToggle'

                                }
                            ]
                        }
                    },
                    {
                        screen: "chime.ProfileScreen",
                        label: "Profile",
                        title: "Profile",
                        icon: icons[1],
                        navigatorButtons: {
                            leftButtons: [
                                {
                                    icon: icons[2],
                                    title: 'Menu',
                                    id: 'sideDrawerToggle'

                                }
                            ]
                        }
                    }
                ],
                /* IOS only */
                tabsStyle: {
                    tabBarSelectedButtonColor: getDefaultTheme()
                },
                /* Android only */
                appStyle: {
                    tabBarSelectedButtonColor: getDefaultTheme()
                },
                drawer: {
                    left: {
                        screen: "chime.SideDrawer"
                    }
                }
            });
        }
    )

}


export default startTabs;
