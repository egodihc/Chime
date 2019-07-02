import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);


export const checkContacts = () => {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase({name: 'contactsChime.db', location: 'Library'})
        .then(DB => {
            console.log('Database opened.');
    
            DB.executeSql('CREATE TABLE IF NOT EXISTS Contacts(first TEXT, last TEXT, id INTEGER, lastSeen TEXT, picture TEXT)')
            .then(() => {
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
                console.log('Could not create contacts DB.');
            });
        })
    })
}

export const insertContactData = (first, last, id, lastSeen, picture) => {

    return new Promise((resolve, reject) => {
        SQLite.openDatabase({name: 'contactsChime.db', location: 'Library'})
        .then(DB => {
    
            console.log('Database opened.');
            DB.executeSql(`SELECT * FROM CONTACTS WHERE id = ${id}`)
            .then(([results]) => {
                if (results.rows.length === 0) {
                    DB.executeSql(`INSERT INTO Contacts (first, last, id, lastSeen, picture) VALUES("${first}","${last}", ${id}, "${lastSeen}", "${picture}")`)
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
                                        id = ${id},
                                        picture = "${picture}"
                                        WHERE id  = ${id}`)
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

