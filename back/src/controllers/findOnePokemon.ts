import { Request, Response } from "express";
import axios from "axios"
import { IAbility, IHabilidad, IPokemonStats, IPokemonsDataAPI, IPokemonsDataResponse, ITypes } from "../interface";
const URL = "https://pokeapi.co/api/v2/pokemon"

const findOnePokemon = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data }: IPokemonsDataAPI = await axios.get(`${URL}/${id}`);
    const [puntos_vida, ataque, defensa, ataque_especial, defensa_especial, velocidad ]: IPokemonStats[] = data.stats

    const habilidades = data.abilities!.map(async({ ability }: IAbility): Promise<IHabilidad> => {
      const { name, url } = ability
      let habilidad = {nombre: name, efecto: "N/A", descripcion: "N/A"}
      const { data } =  await axios.get(url)

        for (const entry of data.effect_entries) {
            if (entry.language.name === "en") {
              habilidad = {
                nombre: name,
                efecto: entry.short_effect,
                descripcion: entry.effect
              }
            }
        }
        return habilidad
    })
    const abilitiesResult: IHabilidad[] = await Promise.all(habilidades)

    const dataMapped: IPokemonsDataResponse = {
      id: data.id,
      experiencia: data.base_experience,
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
      imagen_frente: data.sprites.other["official-artwork"].front_default,
      habilidades: abilitiesResult
    }
  return res.status(200).send(dataMapped)
}

export default findOnePokemon