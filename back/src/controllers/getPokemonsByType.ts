/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import axios from "axios"
import getPokemons from "../helper/getPokemons";

const URL = "https://pokeapi.co/api/v2/type"

const getPokemonsByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const { page } = req.query;

    const pageSize = 15
    const startIndex = (Number(page) - 1) * pageSize;
    const endIndex = Number(page) * pageSize;

    const { data } = await axios.get(`${URL}/${type}`)

    if (data.pokemon.length) {
      /**
       * Ya que no podemos paginar un endpoint filtrado aqui realizamos una paginacion "manual".
       * De la doc oficial: Calling any API endpoint without a resource ID or name 
       * will return a paginated list of available resources.
       */
      const paginatedPokemons = data.pokemon.slice(startIndex, endIndex)
      const dataMapped = paginatedPokemons.map((types: any) => types.pokemon)
      const result = await getPokemons(dataMapped);

      return res.status(200).json({ 
        count: Math.ceil(data.pokemon.length / pageSize),
        data: result
      });
    }
    else {
      return res.status(404).json({ 
        count: 0,
        data: []
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", data: [] })
  }
}

export default getPokemonsByType