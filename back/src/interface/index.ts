import { Request } from "express"
import { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export interface IPokemonStats {
  base_stat: number,
  effort: number,
  stat: IStat
}

export interface ITypes {
  slot: number;
  type: IStat
}

export interface IStat {
  name: string;
  url: string;
}

export interface IPokemonsDataAPI {
  data: {
    id: number;
    base_experience: number;
    name: string;
    stats: IPokemonStats[];
    height: number;
    weight: number;
    types: ITypes[];
    sprites: ISprites;
    imagen_frente: string;
    abilities?: IAbility[];
  }
}

interface ISprites {
  other: { "official-artwork": { front_default: string; } }
}

export interface IPokemonsDataResponse {
  id: number;
  experiencia: number;
  nombre: string;
  puntos_vida: number;
  ataque: number;
  ataque_especial?: number;
  defensa: number;
  defensa_especial?: number;
  velocidad?: number;
  altura: number;
  peso: number;
  tipo: string[];
  imagen_frente: string;
  habilidades?: IHabilidad[];
}

export interface IAbility {
  ability: IStat
}

export interface IHabilidad {
  nombre: string;
  efecto: string;
  descripcion: string;
}