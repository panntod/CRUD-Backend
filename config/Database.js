import { Sequelize } from "sequelize";

let db;

try {
  db = new Sequelize("crud_db", "root", "", {
    host: "localhost",
    dialect: "mysql",
  });
} catch (error) {
  console.error("Cannot connect to database!");
}

export default db;
