import db from './src/config/db.js';

db.query("DESCRIBE LAB_REPORT", (err, res) => {
  console.log(err || res);
  process.exit();
});
