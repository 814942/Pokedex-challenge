import { Router } from "express";
import getAllPokemons from "../controllers/getAllPokemons";
import getPokemonByName from "../controllers/getPokemonByName";
import getAllTypes from "../controllers/getAllTypes";
import getPokemonsByType from "../controllers/getPokemonsByType";

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
 *    parameters:
 *      - in: query
 *        name: page
 *        required: true
 *        description: Numero de pagina por la cual comenzar.
 *        schema:
 *          type:
 *            number
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
/**
 * @swagger
 * /protected/pokemon_types:
 *  get:
 *    summary: Obtener todos los tipos de pokemons.
 *    security: 
 *      - bearerAuth: []
 *    tags:
 *      - Pokemons
 *    responses: 
 *      200:
 *        description: Tipo de pokemons obtenidos.
 *      403:
 *        description: Problema de autentificacion. Token no provisto.
 *      500:
 *        description: Error interno del servidor.
 */
routerPokemons.get("/pokemon_types", getAllTypes)
/**
 * @swagger
 * /protected/pokemon_types/{type}:
 *  get:
 *    summary: Obtener todos los Pokemons de acuerdo a su tipo, paginados.
 *    security: 
 *      - bearerAuth: []
 *    tags:
 *      - Pokemons
 *    parameters:
 *      - in: path
 *        name: type
 *        required: true
 *        description: nombre del tipo de Pokemon buscado.
 *        schema:
 *          type:
 *            string
 *      - in: query
 *        name: page
 *        required: true
 *        description: Numero de pagina por la cual comenzar.
 *        schema:
 *          type:
 *            number
 *    responses: 
 *      200:
 *        description: Tipo de Pokemons encontrado.
 *      404:
 *        description: Tipo de Pokemons no encontrado.
 *      403:
 *        description: Problema de autentificacion. Token no provisto.
 *      500:
 *        description: Error interno del servidor.
 */
routerPokemons.get("/pokemon_types/:type", getPokemonsByType)

export default routerPokemons;