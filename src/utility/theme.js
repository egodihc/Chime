export const getColor = (theme, type) => {
    if (theme === 'LIGHT') {
        if (type === 'backgroundColor') {
            return '#eee';
        }
        else if (type === 'color') {
            return 'black';
        }
        else if (type === 'name-header') {
            return '#ddd';
        }
        else if (type === 'header') {
            return '#ddd';
        }
        else if (type === 'border') {
            return 'black';
        }
        else if (type === 'msgSender') {
            return '#48aaf5';
        }
        else if (type === 'msgReceiver') {
            return '#aaa';
        }
        else if (type === 'msgSenderColor') {
            return 'white';
        }
        else if (type === 'msgReceiverColor') {
            return 'black';
        }
        else if (type === 'button') {
            return 'transparent';
        }
        else if (type === 'btnText') {
            return 'black';
        }
        else if (type==='special') {
            return '#00ccff';
        }
        else {
            return 'red';
        }
    }
    else if (theme === 'DARK') {
        if (type === 'backgroundColor') {
            return '#333';
        }
        else if (type === 'color') {
            return 'white';
        }
        else if (type === 'name-header') {
            return '#555';
        }
        else if (type === 'header') {
            return '#222';
        }
        else if (type === 'border') {
            return 'white';
        }
        else if (type === 'msgSender') {
            return '#777';
        }
        else if (type === 'msgReceiver') {
            return '#aaa';
        }
        else if (type === 'msgSenderColor') {
            return 'black';
        }
        else if (type === 'msgReceiverColor') {
            return 'white';
        }
        else if (type === 'button') {
            return 'transparent';
        }
        else if (type === 'btnText') {
            return 'white';
        }
        else if (type==='special') {
            return '#00ccff';
        }
        else {
            return 'red';
        }
    }
    else {
        return 'red';
    }
}