import { TOGGLE_THEME, SET_THEME } from "../constants";

export const toggleTheme = () => {
    return {
        type: TOGGLE_THEME
    }
}

export const setTheme = (theme) => {
    return {
        type: SET_THEME,
        payload: theme
    }
}