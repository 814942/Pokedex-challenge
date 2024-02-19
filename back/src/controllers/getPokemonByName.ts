import { Request, Response } from "express";
import axios from "axios"

import { IAbility, IHabilidad, IPokemonStats, IPokemonsDataAPI, IPokemonsDataResponse, ITypes } from "../interface";
const URL = "https://pokeapi.co/api/v2/pokemon"

const getPokemonByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const { data }: IPokemonsDataAPI = await axios.get(`${URL}/${name}`)

    /* 
    Esta condicional esta un poco de mas ya que si no encuentra el pokemon buscado 
    la API se rompe y cae en el catch
    */
    if (data) {
      const [
        puntos_vida,
        ataque,
        defensa,
        ataque_especial,
        defensa_especial,
        velocidad
      ]: IPokemonStats[] = data.stats

      const habilidadesPromises = data.abilities!.map(async ({ ability }: IAbility): Promise<IHabilidad> => {
        const { name, url } = ability;
        const defaultHabilidad: IHabilidad = { nombre: name, efecto: "N/A", descripcion: "N/A" };

        const { data: abilityData } = await axios.get(url);

        for (const entry of abilityData.effect_entries) {
            if (entry.language.name === "en") {
                return {
                    nombre: name,
                    efecto: entry.short_effect,
                    descripcion: entry.effect
                };
            }
        }
        // If no English entry found, return default
        return defaultHabilidad;
      });
      const abilitiesResult: IHabilidad[] = await Promise.all(habilidadesPromises);

      const dataMapped: IPokemonsDataResponse = {
        id: data.id,
        nombre: data.name,
        puntos_vida: puntos_vida.base_stat,
        ataque: ataque.base_stat,
        ataque_especial: ataque_especial.base_stat,
        defensa: defensa.base_stat,
        defensa_especial: defensa_especial.base_stat,
        velocidad: velocidad.base_stat,
        altura: data.height,
        peso: data.weight,
        tipo: data.types.map((ele: ITypes) => ele.type.name),
        habilidades: abilitiesResult
      }
      return res.status(200).json({ message: "Pokemon encontrado", data: dataMapped })
    } 
    else {
      return res.status(404).json({ message: "Pokemon no encontrado", data: [] })
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ message: error.message, data: [] })
    }
    return res.status(500).json({ message: "Internal server error", data: [] })
  }
}

export default getPokemonByName