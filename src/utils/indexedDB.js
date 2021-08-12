export const DBOpen = (dbName, store) => {
    let db = null;

    return new Promise((res, rej) => {
        const DBOpenReq = indexedDB.open(dbName, 1);

        DBOpenReq.addEventListener('error', (err) => {
            rej(err);
        });

        DBOpenReq.addEventListener('success', (ev) => {
            db = ev.target.result;

            res(db);
        });

        DBOpenReq.addEventListener('upgradeneeded', (ev) => {
            db = ev.target.result;

            if (!db.objectStoreNames.contains(store)) {
                db.createObjectStore(store, {keyPath: 'id'});
            }

            res(db);
        })
    })
};

export const getStoreByTransaction = (db, store, type) => {
    const tx = db.transaction(store, type);

    tx.oncomplete = (ev) => {
        console.log(ev);
    };

    tx.onerror = (err) => {
        console.warn(err);
    };

    return tx.objectStore(store);
};

export const multipleAdd = (data, db, store, type) => {
    for (const item of data) {
        getStoreByTransaction(db, store, type).add(item);
    }
};
