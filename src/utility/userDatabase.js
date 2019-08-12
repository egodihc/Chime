import SQLite from "react-native-sqlite-storage";

export const getUser = () => {

    return new Promise((resolve, reject) => {
        SQLite.openDatabase({name: 'userChime.db', location: 'Library'})
        .then(DB => {
            DB.executeSql("SELECT * from User", [])
            .then(([results]) => {
                resolve(results.rows.item(0));
            })
            .catch((e) => {
                console.log('Could not get user.');
                reject(e);
            })
        })
        .catch(() => {
            console.log('Could not open user DB.');
        });
        
    })
}


export const insertUserData = (first, last, username, password, picture) => {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase({name: 'userChime.db', location: 'Library'})
        .then(DB => {
    
            DB.executeSql(`INSERT INTO User (first, last, username, password, picture, theme) VALUES("${first}","${last}", "${username}", "${password}", "${picture}", "DARK")`)
            .then(() => {
                console.log('User data inserted');
                resolve(true);
            })
            .catch((e) => {
                console.log('Could not insert data.');
                reject(e);
            });
        })
    })
}


export const saveThemeToDB = (theme) => {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase({name: 'userChime.db', location: 'Library'})
        .then(DB => {
    
            DB.executeSql(`UPDATE User SET Theme = "${theme}"`)
            .then(() => {
                console.log('Theme saved.', theme);
                resolve(true);
            })
            .catch((e) => {
                console.log('Theme could not be saved.', theme);
                reject(e);
            });
        })
    })
}
