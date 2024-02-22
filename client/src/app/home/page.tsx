'use client'
import { useEffect, useState } from "react";
import useSWR from "swr";

import Modal from "@/components/molecules/Modal/Modal"
import LoadingSpinner from "@/components/molecules/Spinner/LoadingSpinner";
import Card from "@/components/organisms/Card";

import IPokemonsProps, { IRequestProp } from "@/interfaces/pokemons.interface";

import { APIManager } from "@/services/APIManager";

import Navbar from "../pages/navbar/Navbar";

import { usePokemonContext } from "@/context/data.context";

const manager = new APIManager()
const url = "/protected/pokemons?page="

const HomePage = () => {
  const { allPokemons, setAllPokemons, setPreviousPokemons } = usePokemonContext()
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { data: pokemons } = useSWR<IRequestProp<IPokemonsProps[]>>(
    `${url}${pageIndex}`, 
    (path: string) => manager.getAllPokemons(path)
  )

  useEffect(() => {
    if (pokemons) {
      setAllPokemons(pokemons.data!)
      setPreviousPokemons!(pokemons.data!)
      setTotalPages(pokemons?.count!)
    }
  }, [pokemons, setAllPokemons, setPreviousPokemons])

  return allPokemons?.length ? (
    <>
      <div id="container_home" className="flex w-full justify-between items-center">
        <div className="w-full">
          <div id="navbar" className="border-cs-gray-200 w-full border-b-8 shadow-xl">
          <Navbar />
          </div>
          <div id="card_list" className="flex flex-wrap justify-between items-center gap-2.5 mt-5 p-4">
            {allPokemons && allPokemons.length && allPokemons.map((pokemon: IPokemonsProps) => {
              return (
                <div 
                  id="card_list_item"
                  key={pokemon.id}
                  className="w-[370px] border-[16px] border-solid rounded-2xl border-cs-gray-200 mb-6 shadow-2xl transition-transform duration-300 transform hover:translate-y-4"
                >
                  <Card
                    id={pokemon.id}
                    nombre={pokemon.nombre}
                    puntos_vida={pokemon.puntos_vida}
                    ataque={pokemon.ataque}
                    defensa={pokemon.defensa}
                    altura={pokemon.altura}
                    peso={pokemon.peso}
                    tipo={pokemon.tipo}
                    imagen_frente={pokemon.imagen_frente}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div id="pagination" className="flex justify-between items-center m-4">
        <div className="text-cs-gray-200">
          <p>Pagina {pageIndex} de {totalPages}</p>
        </div>
        <div className="flex gap-8">
          <button 
            className="border-2 border-cs-gray-200 text-cs-gray-200 p-2 rounded-md shadow-inner hover:shadow-xl"
            onClick={() => setPageIndex(pageIndex - 1)}>Anterior</button>
          <button 
            className="border-2 border-cs-gray-200 text-cs-gray-200 p-2 rounded-md shadow-inner hover:shadow-xl"
            onClick={() => setPageIndex(pageIndex + 1)}>Siguiente</button>
        </div>
      </div>
      
    </>
  ) : <LoadingSpinner />
}

export default HomePage