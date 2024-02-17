import { Router } from "express";
import getAllPokemons from "../controllers/getAllPokemons";
import getPokemonByName from "../controllers/getPokemonByName";

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
 * /protected/pokemon/{name}:
 *  get:
 *    summary: Obtener un pokemon por el nombre
 *    security: 
 *      - bearerAuth: []
 *    tags:
 *      - Pokemons
 *    parameters:
 *      - in: path
 *        name: name
 *        required: true
 *        description: nombre del Pokemon buscado
 *        schema:
 *          type:
 *            string
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
routerPokemons.get("/pokemon/:name", getPokemonByName)

export default routerPokemons;