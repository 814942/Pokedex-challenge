import axios from "axios"

import { IPokemonStats, IPokemonsDataAPI, IPokemonsDataResponse, IStat, ITypes } from "../interface";

const getPokemons = async (pokemons: IStat[]) => {
  try {
    const dataPokemon = pokemons.map(({ url }: IStat) => axios.get(url));
    const result = await Promise.all(dataPokemon)
    return result.map(({ data }: IPokemonsDataAPI): IPokemonsDataResponse => {
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
  } catch (error) {
    console.error(`Error fetching data `, error);
    throw new Error()
  }
}

export default getPokemons