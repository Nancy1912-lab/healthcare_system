import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shaif@121006", // XAMPP has no password
  database: "healthcare_db"
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

export default db;