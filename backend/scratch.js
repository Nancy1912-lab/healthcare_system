import db from './src/config/db.js';

db.query("ALTER TABLE LAB_REPORT ADD COLUMN urgency VARCHAR(50) DEFAULT 'normal'", (err, res) => {
  console.log(err || "Added urgency column");
  process.exit();
});
