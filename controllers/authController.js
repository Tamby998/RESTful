import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config, pool } from "../config/config.js";

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );
    const { ...user } = result.rows[0];
    res.status(201).json({ ...user, password: null });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { register, login, profile };