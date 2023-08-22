import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  console.log('PUT to the database');
  const todosDb = await openDB('content', 1);
  const tx = todosDb.transaction('content', 'readwrite');
  const store = tx.objectStore('content');
  const request = store.put({ content: content });
  const result = await request;
  console.log('Data saved to the database', result);
};

// export const putDb = async (content) => console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database

export const getDb = async () => {
  console.log('GET from the database');
  const indexedDb = await openDB('index', 1);
  const tx = indexedDb.transaction('index', 'readwrite');
  const store = tx.objectStore('index');
  const request = store.get(1);
  const result = await request;
  console.log(`result.value`, result);
  return result;
}

// export const getDb = async () => console.error('getDb not implemented');

initdb();
