import { Request, Response } from 'express';
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env

const login = (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    if (username) {
      const token = jwt.sign({ username }, `${JWT_SECRET}`, { expiresIn: "1d" });

      return res.status(200).json({ username, token });
    } else {
      return res.status(401).json({ message: "Debes escribir un nombre de usuario" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default login