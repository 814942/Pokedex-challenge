"use client"
import { useContext, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";

import Dropdown from "@/components/atoms/Dropdown";
import TextField from "@/components/atoms/TextField";
import LoadingSpinner from "@/components/molecules/Spinner/LoadingSpinner";
import { usePokemonContext } from "@/context/data.context";

import IPokemonsProps, { IRequestProp, ITypes } from "@/interfaces/pokemons.interface";

import { APIManager } from "@/services/APIManager";

const manager = new APIManager()

const getPokemonByNameUrl = "/protected/pokemon/"
const getPokemonTypesUrl = "/protected/pokemon_types"
const getPokemonByTypesUrl = "/protected/pokemon_types/"

const Navbar = () => {
  const { setAllPokemons, previousPokemons } = usePokemonContext()

  const { data: pokemon, error, mutate: mutatePokemon, isLoading } = useSWR<IRequestProp<IPokemonsProps>>(
    getPokemonByNameUrl,
    (path: string) => manager.getPokemonByName(path),
    { 
      revalidateOnMount: false,
      revalidateOnFocus: false
    }
  )
  const { data: typesOfPokemons } = useSWR<IRequestProp<ITypes[]>>(
    getPokemonTypesUrl,
    (path: string) => manager.getPokemonType(path)
  )
  const { data: pokemonTypes, mutate: mutatePokemonType } = useSWR<IRequestProp<IPokemonsProps[]>>(
    getPokemonByTypesUrl,
    (path: string) => manager.getPokemonsByType(path, 1),
    { 
      revalidateOnMount: false,
      revalidateOnFocus: false
    }
  )

  const handleChangeInput = async (value: string) => {
    const searchPokemon = manager.getPokemonByName(getPokemonByNameUrl, value)
    mutatePokemon(searchPokemon, { revalidate: false })
  }

  const handleChangeDropdown = (type: string) => {
    const searchPokemon = manager.getPokemonsByType(getPokemonByTypesUrl, 1, type)
    mutatePokemonType(searchPokemon, { revalidate: false })
  };

  const handleClearFilters = () => {
    setAllPokemons(previousPokemons!)
  }

  useEffect(() => {
    if (pokemon) {
      // Todo: cuando se busca dos veces un nombre inexistente no vuelve a entrar aqui por segunda vez. Check
      if (pokemon.status === 200) {
        const pokemonFinded: IPokemonsProps[] = [pokemon?.data!]
        setAllPokemons(pokemonFinded)
      }
      else {
        toast.warning("No existe pokemon con ese nombre")
      }
    }
  }, [pokemon, setAllPokemons])
  useEffect(() => {
    if (pokemonTypes) {
      if (pokemonTypes.status === 200) {
        setAllPokemons(pokemonTypes?.data!)
      }
      else {
        toast.warning("No existe ese tipo de pokemon")
      }
    }
  }, [pokemonTypes, setAllPokemons])

  if (error) return <div className="p-2 m-2">Failed to load : {error.message}</div>;
  if (isLoading) return <LoadingSpinner />;

  return (
    <nav className="flex justify-between items-center p-4 bg-secondary">
      <TextField onChange={handleChangeInput}/>
      <div>
          <button 
            className="p-2 border-2 rounded-2xl border-cs-gray-100 shadow-2xl hover:translate-y-px hover:translate-x-px bg-secondary text-cs-white"
            onClick={handleClearFilters}
          >
            Borrar filtros
          </button>
      </div>
      <Dropdown 
        data={typesOfPokemons?.data!} 
        onChange={handleChangeDropdown}
      />
    </nav>
  );
};

export default Navbar;
