import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

export const checkUser = () => {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase({name: 'userChime.db', location: 'Library'})
        .then(DB => {
            console.log('Database opened.');
    
            DB.executeSql('CREATE table IF NOT EXISTS User(First text, Last Text, Email text, Password text, ID Integer, Picture text, Theme text)')
            .then(() => {
                DB.executeSql("SELECT * from User", [])
                .then(([results]) => {
                    resolve(results.rows);
                })
                .catch((e) => {
                    console.log('Could not get user.');
                    reject(e);
                })
            })
            .catch(() => {
                console.log('Could not create user table.');
            });
        })
    })

}


export const insertUserData = (first, last, email, password, ID, picture) => {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase({name: 'userChime.db', location: 'Library'})
        .then(DB => {
    
            console.log('Database opened.');
    
            DB.executeSql(`INSERT INTO User (First, Last, Email, Password, ID, Picture, Theme) VALUES("${first}","${last}", "${email}", "${password}", ${ID}, "${picture}", "LIGHT")`)
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
    
            console.log('Database opened.');
    
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


export const resetDB = () => {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase({name: 'userChime.db', location: 'Library'})
        .then(DB => {
    
            console.log('Database opened.');
    
            DB.executeSql(`DROP TABLE User`)
            .then(() => {
                console.log('User table dropped.');
                resolve(true);
            })
            .catch((e) => {
                console.log('Could not drop user table.');
                reject(e);
            });
        })
    })
}