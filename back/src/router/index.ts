import { Router } from "express";

import routerSecurity from "./routerSecurity";
import routerPokemons from "./routerPokemons";

import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.use("/security", routerSecurity)
router.use("/protected", verifyToken, routerPokemons)

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    LoginSchema:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          descripcion: Nombre del usuario.
 *      requied:
 *        - username
 */

export default router