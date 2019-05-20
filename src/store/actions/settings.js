import { CHANGE_THEME } from "../constants";


export const setTheme = (theme) => {
    return {
        type: CHANGE_THEME,
        payload: theme
    }
}