/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import axios from "axios"

const URL = "https://pokeapi.co/api/v2/type"

interface ITypes {
  id: number;
  nombre: string;
}

const getAllTypes = async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get(URL)
    const typesMapped: ITypes[] = []
    for (let index = 0; index < data.results.length; index++) {
      const type = {
        id: index + 1,
        nombre: data.results[index].name
      }
      typesMapped.push(type)
    }

    return res.status(200).send({ message: "Tipo de Pokemones", data: typesMapped })
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", data: [] })
  }
}

export default getAllTypes