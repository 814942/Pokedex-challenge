"use client"
import useSWR from "swr";
import Image from "next/image";

import IPokemonsProps, { IRequestProp } from "@/interfaces/pokemons.interface";

import { APIManager } from "@/services/APIManager";

import imgNotFound from "../../../components/organisms/notFound.png";

import DetailsTable from "./DetailsTable";

import LoadingSpinner from "@/components/molecules/Spinner/LoadingSpinner";
import BackToHome from "@/components/atoms/BackHome";

interface IDetailsProps {
  params: { id: number };
}

const manager = new APIManager()

const Details = ({ params }: IDetailsProps) => {
  const { data: pokemon } = useSWR<IRequestProp<IPokemonsProps>>(
    `/protected/pokemon/`, 
    (path: string) => manager.getPokemonByName(path, params.id)
  )

  return pokemon?.data ? (
    <div id="details_container" className="m-20 bg-cs-white shadow-2xl rounded-2xl">
      <div className="flex h-3/4 rounded-2xl">
        <div id="card_content" className="bg-cs-white w-2/5 bg-secondary border-2 border-solid rounded-2xl shadow-2xl">
          <div id="img_container" className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat h-3/4 w-10/12 border-4 border-solid rounded-full border-cs-gray-200 bg-primary p-4 m-4 shadow-xl">
          {pokemon?.data.imagen_frente ?
            <Image
              className="h-full w-full max-w-xs transition duration-300 ease-in-out hover:scale-110"
              loader={() => pokemon?.data!.imagen_frente}
              src={pokemon?.data!.imagen_frente}
              alt={pokemon?.data!.nombre}
              width={200}
              height={200}
              priority
            /> : 
            <Image
              src={imgNotFound}
              alt="not found"
              width={100}
              height={100}
              priority
            /> 
          }
          </div>
          <div className="flex gap-2 justify-center items-center text-cs-white">
            <p className="capitalize font-bold">{pokemon?.data!.nombre}</p>
            {pokemon?.data!.tipo.length && pokemon?.data!.tipo.map((t: string) => 
            <p key={t} className="bg-cs-gray-300 text-cs-white capitalize rounded-full p-1">{t}</p>)}
          </div>
        </div>
        <div id="card_details" className="w-8/12">
          <div className="flex justify-around text-cs-white m-4 bg-terciary border-2 border-solid border-cs-gray-100 rounded-2xl shadow-2xl">
            <div className="p-4">
            <p className="bg-transparent">Puntos de combate </p>
            <p className="bg-transparent text-cs-gray-300 p-1">{pokemon?.data.ataque} Pts</p>
            <p className="bg-transparent">Ataque especial </p>
            <p className="bg-transparent text-cs-gray-300 p-1">{pokemon?.data.ataque_especial} Pts</p>
            <p className="bg-transparent">Defensa </p>
            <p className="bg-transparent text-cs-gray-300 p-1">{pokemon?.data.defensa} Pts</p>
            <p className="bg-transparent">Defensa especial</p>
            <p className="bg-transparent text-cs-gray-300 p-1">{pokemon?.data.defensa_especial} Pts</p>
            </div>
            <div className="p-4">
            <p className="bg-transparent">Puntos de vida </p>
            <p className="bg-transparent text-cs-gray-300 p-1">{pokemon?.data.puntos_vida} Pts</p>
            <p className="bg-transparent">Altura </p>
            <p className="bg-transparent text-cs-gray-300 p-1">{pokemon?.data.altura} Ft</p>
            <p className="bg-transparent">Peso </p>
            <p className="bg-transparent text-cs-gray-300 p-1">{pokemon?.data.peso} Lb</p>
            <p className="bg-transparent">Velocidad </p>
            <p className="bg-transparent text-cs-gray-300 p-1">{pokemon?.data.velocidad} Pts</p>
            </div>
          </div>
        </div>
      </div>
      <div id="details_table" className="mt-6 bg-cs-gray-100 border-2 border-solid rounded-2xl border-cs-gray-100 shadow-modal overflow-hidden">
        <DetailsTable data={pokemon?.data?.habilidades!} />
      </div>
      <BackToHome />
    </div>
  ) : <LoadingSpinner />
};

export default Details;
