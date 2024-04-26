import express from "express";

import jwt from "jsonwebtoken";

import { connectToDatabase } from "../utils/dbUtils.mjs";

import { private_key } from "../utils/private_key.mjs";


const router = express.Router();

// Middleware pour la connexion à la base de données
const connectToDatabaseMiddleware = async (req, res, next) => {
  console.log( "database conenction" );
  try {
    req.dbConnection = await connectToDatabase();
    next();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


router.post('/', connectToDatabaseMiddleware, async (req, res) => {
  const { username, password } = req.body;
  
  const queryString = 'SELECT * FROM t_users WHERE useName = ? AND usePassword = ?';

  try {
    const [rows] = await req.dbConnection.execute(queryString, [username, password]);
    if (rows.length > 0) {
      const token = jwt.sign({ userId: rows.idUser }, private_key, {
        expiresIn: "1h",
        algorithm: "HS512"
      });
      const message = `L'utilisateur a été connecté avec succès`;
      return res.status(200).json({ message, data: username, token });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
