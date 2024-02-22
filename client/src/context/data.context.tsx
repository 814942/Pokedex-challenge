"use client"
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import IPokemonsProps from "@/interfaces/pokemons.interface";
/**
 * Para utilizar Context, hay 3 elementos importantes que debemos tener en cuenta:
 * - Context
 * - Provider
 * - Consumer
 */
interface IContextPokemons {
  user?: string;
  setUser: Dispatch<SetStateAction<string>>;
  allPokemons?: IPokemonsProps[];
  setAllPokemons: Dispatch<SetStateAction<IPokemonsProps[]>>;
  previousPokemons?: IPokemonsProps[];
  setPreviousPokemons?: Dispatch<SetStateAction<IPokemonsProps[]>>;
}

interface IPokemonProvideProps {
  children: JSX.Element[] | JSX.Element | React.ReactNode;
}

// Creamos el Context con un obj predefinido
const PokemonContext = createContext<IContextPokemons>({
  user: "",
  setUser: () => {},
  allPokemons: [],
  setAllPokemons: () => {},
  previousPokemons: [],
  setPreviousPokemons: () => {}
});

// Creamos el Provider que envolvera nuestra app y/o componentes
export const PokemonProvider = ({ children }: IPokemonProvideProps) => {
  const [user, setUser] = useState<string>("Hola");
  const [allPokemons, setAllPokemons] = useState<IPokemonsProps[]>([]);
  const [previousPokemons, setPreviousPokemons] = useState<IPokemonsProps[]>(allPokemons);

  return (
    <PokemonContext.Provider value={{ 
      user, setUser, allPokemons, setAllPokemons, previousPokemons, setPreviousPokemons
    }}>
      {children}
    </PokemonContext.Provider>
  );
}

// Creamos el Consumer para utilizar en la app
export function usePokemonContext() {
  return useContext(PokemonContext)
}