import express from "express";
import cors from "cors";
import doctorRoutes from "./routes/doctorRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/doctors", doctorRoutes);

app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});