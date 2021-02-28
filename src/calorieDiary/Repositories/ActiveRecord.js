import fs from "fs";

/*
Inside a static method 'this' always refers to the class 
*/

let db = {
    lastIds: {},
    records: {},
};

class ActiveRecord {
    static _fileName = "db.json";

    static getAll() {
        ActiveRecord._initialize(this.name);

        return db.records[this.name];
    }

    /**
     * Finds record based on id provided.
     * @param {number} id id of the record you want to find.
     * @returns an instance with the matching id, or undefined if it is not found.
     */
    static getOneById(id) {
        ActiveRecord._initialize(this.name);

        return db.records[this.name].find((record) => record.id === id);
    }

    /**
     * Finds record with same id as the one passed in the argument, and updates it with new values.
     * @param {ActiveRecord} record to be updated.
     * @returns {boolean} Whether a change was made or not.
     */
    static update(record) {
        ActiveRecord._initialize(this.name);

        let madeChanges = false;

        db.records[this.name] = db.records[this.name].map((oldRecord) => {
            const hasSameId = oldRecord.id === record.id;

            if (hasSameId) {
                madeChanges = true;
                return record;
            }

            return oldRecord;
        });

        ActiveRecord._serialize();

        return madeChanges;
    }

    /**
     * Deletes record with same id as the one provided.
     * @param {string | number} id id of record to be deleted.
     * @returns {boolean} Whether the record was deleted or not.
     */
    static delete(id) {
        ActiveRecord._initialize(this.name);
        const parsedId = parseInt(id);

        let madeChanges = false;

        db.records[this.name] = db.records[this.name].filter((record) => {
            if (record.id === parsedId) {
                madeChanges = true;

                return false;
            }

            return true;
        });

        ActiveRecord._serialize();

        return madeChanges;
    }

    save() {
        const className = this.constructor.name; // instace class name
        ActiveRecord._initialize(className);

        const isAlreadyInDb = this.id !== undefined;

        if (isAlreadyInDb) {
            db.records[className].map((record) => (record.id === this.id ? this : record));
        } else {
            this.id = db.lastIds[className] + 1;
            db.lastIds[className] += 1;
            db.records[className].push(this);
        }

        ActiveRecord._serialize();
    }

    /**
     * Makes sure keys in db.object referring to this class are not empty.
     * @param {string} modelName Name of the class/model being saved.
     */
    static _initialize(modelName) {
        const isDbBrandNew =
            db.lastIds[modelName] === undefined || db.records[modelName] === undefined;

        if (isDbBrandNew) {
            const dbExists = fs.existsSync(ActiveRecord._fileName);

            if (dbExists) {
                const dbFile = fs.readFileSync(ActiveRecord._fileName);

                db = JSON.parse(dbFile);
            }

            // logical nullish assignment
            db.lastIds[modelName] ??= 0;
            db.records[modelName] ??= [];
        }
    }

    /**
     * Translates the db object into a JSON file.
     */
    static _serialize() {
        const stringifiedDb = JSON.stringify(db, undefined, 2);
        fs.writeFileSync(ActiveRecord._fileName, stringifiedDb);
    }
}

export default ActiveRecord;
