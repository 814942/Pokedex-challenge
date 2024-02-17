import { Router } from "express";
import login from "../controllers/login";

const routerSecurity = Router()

/**
 * @swagger
 * /security/login:
 *  post:
 *    summary: Autentificate en la aplicacion para obtener token
 *    tags:
 *      - Security
 *    requestBody:
 *        description: Esquema de Login
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginSchema'
 *    responses: 
 *      200:
 *        description: Autentificacion exitosa.
 *      401:
 *        description: Problema de autentificacion.
 *      500:
 *        description: Error interno del servidor.
 */
routerSecurity.post("/login", login);

export default routerSecurity;