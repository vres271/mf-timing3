export function migrationFactory() {
    // The animal table was added with version 2 but none of the existing tables or data needed
    // to be modified so a migrator for that version is not included.
    return {
      1: (db:any, transaction:any) => {
        const store = transaction.objectStore('users');
        store.createIndex('name', 'name', { unique: false });
      },
      3: (db:any, transaction:any) => {
        const store = transaction.objectStore('users');
        store.createIndex('email', 'email', { unique: false });
      }
    };
  }