import { THEME } from "../store/constants";

export const getTheme = (type) => {

    const theme = THEME;

    if (type === 'text') {
        if (theme === 'LIGHT') {
            return '#333';
        }
        else {
            return 'white';
        }
    }
    else if (type === 'bg') {
        if (theme === 'LIGHT') {
            return 'white';
        }
        else {
            return '#333';
        }
    }
    else if (type === 'input') {
        if (theme === 'LIGHT') {
            return 'white';
        }
        else {
            return '#404040';
        }
    }
    else {
        return '#0EBFE9'
    }
}