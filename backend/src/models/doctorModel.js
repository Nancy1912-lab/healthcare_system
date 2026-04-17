const db = require("../config/db");

exports.createDoctor = (data, cb) => {
  const sql = "INSERT INTO doctors (name, experience, specialization_id) VALUES (?, ?, ?)";
  db.query(sql, [data.name, data.experience, data.specialization_id], cb);
};

exports.getDoctors = (cb) => {
  db.query("SELECT * FROM doctors", cb);
};

exports.getDoctorById = (id, cb) => {
  db.query("SELECT * FROM doctors WHERE doctor_id=?", [id], cb);
};

exports.updateDoctor = (id, data, cb) => {
  const sql = "UPDATE doctors SET name=?, experience=?, specialization_id=? WHERE doctor_id=?";
  db.query(sql, [data.name, data.experience, data.specialization_id, id], cb);
};

exports.deleteDoctor = (id, cb) => {
  db.query("DELETE FROM doctors WHERE doctor_id=?", [id], cb);
};