export const BLUE = 'BLUE';
export const ORANGE = 'ORANGE';
export const DARK = 'DARK';

export const getColor = (theme) => {

    switch (theme) {
        case BLUE:
            return '#ADD8E6';
        case DARK:
            return '#000';
        default:
            return '#ADD8E6';
    }
}

export const getTheme = (theme) => {
    if (theme === BLUE) {
        return '#ADD8E6';
    }
    else {
        return 'orange';
    }
    
    
}