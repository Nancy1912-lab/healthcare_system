import db from './src/config/db.js';

db.query("ALTER TABLE LAB_REPORT ADD COLUMN file_url VARCHAR(255)", (err, res) => {
  console.log(err || "Added file_url");
  process.exit();
});
