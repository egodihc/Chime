import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = (theme) => {

    /* Execute async functions which return the icons and THEN register tabs */
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? 'md-send' : 'md-send', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-person' : 'md-person', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30)
    ])
    .then(
        (icons) => {
            Navigation.setRoot({
                root: {
                    bottomTabs: {
                        id: "BottomTabs",
                        children: [{
                            stack: {
                                id: "MessengerStack",
                                children: [{
                                    component: {
                                        id: "UsersScreen",
                                        name: "chime.UsersScreen",
                                        options: {
                                            bottomTab: {
                                                icon: icons[0],
                                                text: "Messenger"
                                            }
                                        }
                                    }
                                }],
                                options: {
                                    topBar: {
                                        title: {
                                            text: "Messenger"
                                        }
                                    }
                                }
                            }
                        },
                        {
                            stack: {
                                id: "ProfileStack",
                                children: [{
                                    component: {
                                        id: "ProfileScreen",
                                        name: "chime.ProfileScreen",
                                        options: {
                                            bottomTab: {
                                                icon: icons[1],
                                                text: "Profile"
                                            }
                                        }
                                    }
                                }],
                                options: {
                                    topBar: {
                                        title: {
                                            text: "My Profile"
                                        }
                                    }
                                }
                            }

                        }]
                    }
                }
            });
        }
    )

}





export default startTabs;
