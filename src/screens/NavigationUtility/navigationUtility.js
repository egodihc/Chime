import { Navigation } from "react-native-navigation";
import { getTheme } from "../../utility/theme";

export const navigationButtonPressed = (buttonId, screen) => {
    if (buttonId === "sideDrawerToggle") {
        Navigation.mergeOptions(screen, {
            sideMenu: {
                left: {
                    visible: true
                }
            }
        })
    }
}

export const hideDrawer = () => {
    Navigation.mergeOptions("UsersScreen", {
        sideMenu: {
            left: {
                visible: false
            }
        }
    })
}

export const updateStyles = (screen, theme) => {
    Navigation.mergeOptions(screen, {
        topBar: {
            background: {
                color: getTheme(theme, 'bg')
            },
            title: {
                color: getTheme(theme, 'text')
            }
        },
        bottomTabs: {
            backgroundColor: getTheme(theme, 'bg'),

        },
        bottomTab: {
            iconColor: getTheme(theme, 'text'),
            textColor: getTheme(theme, 'text'),
            selectedIconColor: getTheme(theme, 'text'),
            selectedTextColor: getTheme(theme, 'text')
        }
    });
}