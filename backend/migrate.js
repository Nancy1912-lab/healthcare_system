import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'shaif@121006', 
  database: 'healthcare_db'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to DB:', err);
    process.exit(1);
  }
  console.log('Connected to DB.');

  const addColumn = (query) => {
    return new Promise((resolve) => {
      db.query(query, (err) => {
        if (err) {
          if (err.code === 'ER_DUP_COLUMN_NAME') {
             console.log('Column already exists, skipping...');
          } else {
             console.log('Error:', err.message);
          }
        } else {
          console.log('Success:', query);
        }
        resolve();
      });
    });
  };

  async function run() {
    await addColumn('ALTER TABLE PRESCRIPTION ADD COLUMN diagnosis TEXT NOT NULL AFTER appointment_id');
    await addColumn('ALTER TABLE PRESCRIPTION ADD COLUMN medicines TEXT NOT NULL AFTER diagnosis');
    await addColumn('ALTER TABLE PRESCRIPTION ADD COLUMN notes TEXT AFTER medicines');
    await addColumn('ALTER TABLE PRESCRIPTION ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP');
    console.log('Migration finished.');
    db.end();
  }

  run();
});
