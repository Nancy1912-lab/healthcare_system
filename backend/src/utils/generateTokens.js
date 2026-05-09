
import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.patient_id || user.doctor_id,
      email: user.email
    },
    "secretkey123",   // later move to .env
    { expiresIn: "1d" }
  );
};
