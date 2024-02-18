import { Request, Response } from "express";
import axios from "axios"

import getPokemons from "../helper/getPokemons";

const URL = "https://pokeapi.co/api/v2/pokemon"

const getAllPokemons = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;
    let offset: number = 0;
    const pageSize = 15
    if (page) {
      offset = (Number(page) - 1) * 15;
    }

    const { data } = await axios.get(`${URL}?limit=${pageSize}&offset=${offset}`);

    const result = await getPokemons(data.results);

    return res.status(200).send({ 
      count: Math.ceil(data.count / pageSize),
      data: result
    });
  } catch (error) {
    console.error(`Error fetching data in findOnePokemon:`, error);
    return res.status(500).json({ message: "Internal server error" })
  }
}

export default getAllPokemons