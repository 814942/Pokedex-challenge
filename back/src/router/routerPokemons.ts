import { Router } from "express";
import getAllPokemons from "../controllers/getAllPokemons";
import findOnePokemon from "../controllers/findOnePokemon";

const routerPokemons = Router();
/**
 * @swagger
 * /protected/pokemons:
 *  get:
 *    summary: Obtener todos los pokemons, paginados
 *    security: 
 *      - bearerAuth: []
 *    tags:
 *      - Pokemons
 *    responses: 
 *      200:
 *        description: Pokemons obtenidos.
 *      403:
 *        description: Problema de autentificacion. Token no provisto.
 *      500:
 *        description: Error interno del servidor.
 */
routerPokemons.get("/pokemons", getAllPokemons)
/**
 * @swagger
 * /protected/pokemons/{id}:
 *  get:
 *    summary: Obtener un pokemon por id o nombre
 *    security: 
 *      - bearerAuth: []
 *    tags:
 *      - Pokemons
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: id o nombre del Pokemon buscado
 *        schema:
 *          oneOf:
 *            - type: string
 *            - type: integer
 *    responses: 
 *      200:
 *        description: Pokemon encontrado.
 *      404:
 *        description: Pokemon no encontrado.
 *      403:
 *        description: Problema de autentificacion. Token no provisto.
 *      500:
 *        description: Error interno del servidor.
 */
routerPokemons.get("/pokemons/:id", findOnePokemon)

export default routerPokemons;