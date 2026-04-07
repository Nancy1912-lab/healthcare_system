import express from "express";
import cors from "cors";
import db from "./src/config/db.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.get("/test-db", (req, res) => {
  db.query("SELECT * FROM PATIENT", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});