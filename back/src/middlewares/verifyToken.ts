import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../interface";

const { JWT_SECRET } = process.env

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.header("Authorization");
    const token = header!.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token not provied" });
    }

    const decoded = jwt.verify(token, `${JWT_SECRET}`);
    (req as CustomRequest).token = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token not valid" });
  }
}

export default verifyToken