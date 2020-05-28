import SQLite from "react-native-sqlite-storage";

export const getContacts = () => {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase({name: 'contactsChime.db', location: 'Library'})
        .then(DB => {
            DB.executeSql("SELECT * from Contacts", [])
            .then(([results]) => {
                resolve(results.rows);
            })
            .catch((e) => {
                console.log('Could not fetch contacts from DB.');
                reject(e);
            })
        })
        .catch(() => {
            console.log('Could not open contacts DB.');
        });
    })
}


export const insertContactData = (first, last, username, lastSeen, picture) => {

    return new Promise((resolve, reject) => {
        SQLite.openDatabase({name: 'contactsChime.db', location: 'Library'})
        .then(DB => {
    
            DB.executeSql(`SELECT * FROM CONTACTS WHERE username = "${username}"`)
            .then(([results]) => {
                if (results.rows.length === 0) {
                    DB.executeSql(`INSERT INTO Contacts (first, last, username, lastSeen, picture) VALUES("${first}","${last}", "${username}", "${lastSeen}", "${picture}")`)
                    .then(() => {
                        console.log('Contact inserted');
                        resolve(true);
                    })
                    .catch((e) => {
                        console.log('Could not insert contact.');
                        reject(e);
                    });
                }
                else {
                    DB.executeSql(`UPDATE Contacts 
                                    SET first = "${first}",
                                        last = "${last}",
                                        lastSeen = "${lastSeen}",
                                        picture = "${picture}"
                                        WHERE username  = "${username}"`)
                    .then(() => {
                        console.log('Contact updated');
                        resolve(true);
                    })
                    .catch((e) => {
                        console.log('Could not update contact.');
                        reject(e);
                    });
                }

            })
            .catch((e) => {
                console.log('Could not insert contact.');
                reject(e);
            });

        })
    })
}

