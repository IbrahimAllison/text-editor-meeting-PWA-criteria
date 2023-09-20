
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

export const putDb = async (content) => {
  console.log("Update the database");

  // Code snippets to create a connection to the database.
  const textDb = await openDB("jate", 1);
  const tx = textDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({ id: 1, value: content });
  const outcome = await request;
  console.log("🚀 - data saved to the database", outcome);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the database");

  // code is opening a connection to the database named "jate"
  const textDb = await openDB("jate", 1);

  // The line of code below initiates a new transaction (tx) on an indexedDB database (textDb)
  const tx = textDb.transaction("jate", "readonly");

  // The line of code below gets a reference to the specified object store ('jate') within the transaction
  const store = tx.objectStore("jate");

  // The line of code below creates a request to retrieve data from the object store witht the key "1"
  const request = store.get(1);

  // The line of code below awaits the completion of the request to retrieve data from the object store. 
  // The result is stored in the "outcome" variable.
  const outcome = await request;

  // Code to log the value of 'outcome' to the console
  console.log("outcome.value", outcome);
  return outcome?.value; // return outcome
};

initdb();