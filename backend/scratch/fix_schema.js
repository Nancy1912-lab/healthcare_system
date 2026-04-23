import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shaif@121006",
  database: "healthcare_db",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error("Connection failed:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL");

  // First try to just make it nullable to stop the error immediately
  db.query("ALTER TABLE PRESCRIPTION MODIFY medicines TEXT NULL", (err1) => {
    if (err1) {
      console.log("Could not modify 'medicines' (maybe it doesn't exist?):", err1.sqlMessage);
    } else {
      console.log("Column 'medicines' is now nullable (or already was).");
    }

    // Then try to drop it properly
    db.query("ALTER TABLE PRESCRIPTION DROP COLUMN medicines", (err2) => {
        if (err2) {
            console.log("Could not drop 'medicines':", err2.sqlMessage);
        } else {
            console.log("Column 'medicines' dropped successfully.");
        }
        db.end();
    });
  });
});
