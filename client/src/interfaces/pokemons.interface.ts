export default interface IPokemonsProps {
  id: number;
  experiencia?: number;
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
  habilidades?: IPokemonAbilities[]
}

export interface IPokemonAbilities {
  nombre: string;
  efecto: string;
  descripcion: string;
}

export interface ITypes {
  id: number;
  nombre: string;
}

export interface IRequestProp<T> {
  status?: number;
  message?: string;
  data?: T;
  count?: number;
}