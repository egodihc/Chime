import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

export const initDB = () => {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase({name: 'userChime.db', location: 'Library'})
        .then(DB => {
            DB.executeSql('CREATE table IF NOT EXISTS User(first TEXT, last TEXT, username TEXT, password TEXT, picture TEXT, theme TEXT)')
            .then(() => {
                SQLite.openDatabase({name: 'messagesChime.db', location: 'Library'})
                .then(DB => {
                    DB.executeSql('CREATE table IF NOT EXISTS Messages(message TEXT, sender TEXT, destination TEXT, timestamp TEXT)')
                    .then(() => {
                        SQLite.openDatabase({name: 'contactsChime.db', location: 'Library'})
                        .then(DB => {
        
                            DB.executeSql('CREATE TABLE IF NOT EXISTS Contacts(first TEXT, last TEXT, username text, lastSeen TEXT, picture TEXT)')
                            .then(() => {
                                console.log('Databases initialised.');
                                resolve(true);
                            })
                            .catch((e) => {
                                console.log('Could not create contacts DB.');
                                reject(e);
                            });
                        })
                    })
                    .catch((e) => {
                        console.log('Could not create message DB.');
                        reject(e);
                    });
                })
            })
            .catch((e) => {
                console.log('Could not create user table.');
                reject(e);
            });
        })
    })
}


export const checkMessages = () => {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase({name: 'messagesChime.db', location: 'Library'})
        .then(DB => {
            DB.executeSql('CREATE table IF NOT EXISTS Messages(messages TEXT, sender TEXT, destination TEXT)')
            .then(() => {
                DB.executeSql("SELECT * from Messages", [])
                .then(([results]) => {
                    resolve(results.rows);
                })
                .catch((e) => {
                    console.log('Could not fetch messages from DB.');
                    reject(e);
                })
            })
            .catch(() => {
                console.log('Could not create message DB.');
            });
        })
    })
}


export const resetDB = () => {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase({name: 'userChime.db', location: 'Library'})
        .then(DB => {
            DB.executeSql(`DROP TABLE User`)
            .then(() => {

                console.log('Dropped TABLE "User".');

                SQLite.openDatabase({name: 'messagesChime.db', location: 'Library'})
                .then(DB => {

                    DB.executeSql('DROP TABLE Messages')
                    .then(() => {

                        console.log('Dropped TABLE "Messages".');

                        SQLite.openDatabase({name: 'contactsChime.db', location: 'Library'})
                        .then(DB => {
        
                            DB.executeSql('DROP TABLE Contacts')
                            .then(() => {
                                console.log('Dropped TABLE "Contacts".');
                                resolve(true);
                            })
                            .catch((e) => {
                                console.log('Could not drop TABLE "Contacts".');
                                reject(e);
                            });
                        })
                    })
                    .catch((e) => {
                        console.log('Could not drop TABLE "Messages".');
                        reject(e);
                    });
                })
            })
            .catch((e) => {
                console.log('Could not drop TABLE "User".');
                reject(e);
            });
        })
    })
}
