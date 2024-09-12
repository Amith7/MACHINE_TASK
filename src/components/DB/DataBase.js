// src/dbConfig.js
import { DBConfig } from "react-indexed-db";

const dbConfig = new DBConfig({
  name: "MyDatabase",
  version: 1,
  objectStoresMeta: [
    {
      store: "users",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "name", keyPath: "name", options: { unique: false } },
        { name: "email", keyPath: "email", options: { unique: true } }
      ]
    }
  ]
});

export default dbConfig;
