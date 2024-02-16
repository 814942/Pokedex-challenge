import { Router, Request, Response } from "express";
import getAllPokemons from "../controllers/getAllPokemons";
import findOnePokemon from "../controllers/findOnePokemon";

const router = Router();

/**
 * @swagger
 * /protected:
 *  get:
 *    summary: Saluda al invitado
 *    security: 
 *      - apiAuth: []
 *    tags:
 *      - Hello
 *    responses: 
 *      200:
 *        description: Saludo exitoso
 *      403:
 *        description: Problema de autentificacion. Token no provisto.
 *      500:
 *        description: Error interno
 */
router.get("/", (req: Request, res: Response) => {
  res.send('Hello, Natural Tech House');
})

router.get("/pokemons", getAllPokemons)

router.get("/pokemons/:id", findOnePokemon)

export default router;

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    apiAuth:
 *      type: bearer token
 *      in: header
 *      name: Authorization
 */