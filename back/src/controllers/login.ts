import { Request, Response } from 'express';
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env

const login = (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    if (username) {
      const token = jwt.sign({ username }, `${JWT_SECRET}`, { expiresIn: "1h" });
      // return { username, token }
      return res.status(200).json({ username, token });
    } else {
      return res.status(401).json({ message: "Autenticación failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default login