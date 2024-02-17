import { Request, Response } from "express";
import axios from "axios"

import { IPokemonStats, IPokemonsDataAPI, IPokemonsDataResponse, IStat, ITypes } from "../interface";

const URL = "https://pokeapi.co/api/v2/pokemon"

const getAllPokemons = async (req: Request, res: Response) => {
  const { data } = await axios.get(URL);
  const dataPokemon = data.results.map((pokemon: IStat) => axios.get(pokemon.url));
  const result = await Promise.all(dataPokemon)
  const resultMapped = result.map(({ data }: IPokemonsDataAPI): IPokemonsDataResponse => {
    const [puntos_vida, ataque, defensa ]: IPokemonStats[] = data.stats

    return {
      id: data.id,
      experiencia: data.base_experience,
      nombre: data.name,
      puntos_vida: puntos_vida.base_stat,
      ataque: ataque.base_stat,
      defensa: defensa.base_stat,
      altura: data.height,
      peso: data.weight,
      tipo: data.types.map(({ type }: ITypes) => type.name),
      imagen_frente: data.sprites.other["official-artwork"].front_default,
    }
  })

  return res.status(200).send({ 
    count: data.count,
    next: data.next,
    previous: data.previous,
    data: resultMapped
  })
}

export default getAllPokemons