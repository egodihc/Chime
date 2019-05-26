export const getTheme = (theme, type) => {

    if (type === 'text') {
        if (theme === 'LIGHT') {
            return 'black';
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
            return 'black';
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
        return '#ADD8E6'
    }

    
    
}