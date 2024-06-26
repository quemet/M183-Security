import express from "express";

import jwt from "jsonwebtoken";

import { private_key } from "../utils/private_key.mjs";

const router = express.Router();

export const get = (req, res) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. AJoutez-en dans l'en-tête de la requête.`;
    return res.status(401).json({ message });
  } else {
    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      private_key,
      (error, decodedToken) => {
        if (error) {
          const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
          return res.status(401).json({ message, data: error });
        }
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
          const message = `L'identifiant de l'utilisateur est invalide`;
          return res.status(401).json({ message });
        } else {
          return res.status(200).json({ token })
        }
      }
    );
  }
};

router.get('/', get);

export default router;
