import Image from "next/image";
import Link from "next/link";

import IPokemonsProps from "@/interfaces/pokemons.interface";

import imgNotFound from "./notFound.png";

const Card = ({
  id,
  nombre,
  puntos_vida,
  ataque,
  defensa,
  altura,
  peso,
  tipo,
  imagen_frente
}: IPokemonsProps) => {
  return (
    <div>
      <div id="card_content" className="shadow-lg flex justify-center bg-cs-white relative max-w-xs overflow-hidden bg-cover bg-no-repeat ">
        <Link href={`/details/${id}`}>
        {imagen_frente ? 
          <Image
            className="max-w-xs transition duration-300 ease-in-out hover:scale-110"
            loader={() => imagen_frente}
            src={imagen_frente}
            alt={nombre}
            width={200}
            height={24}
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
        </Link>
      </div>
      <div id="card-detail" className="bg-cs-gray-100 h-[300px] p-2 rounded-b-xl pt-4">
          <div className="flex gap-2 mb-4 items-center">
            <p className="capitalize font-bold">{nombre}</p>
            {tipo?.length 
            ? tipo.map((t: string) => <p key={t} className="bg-cs-gray-300 text-cs-white capitalize rounded-full p-1">{t}</p>)
            : <p>No hay tipos para mostrar</p>
          }
          </div>
          <div>
            <div className="flex justify-between items-center">
              <p className="rounded-lg m-2 bg-cs-white p-1">HP {puntos_vida}</p>
              <p className="rounded-lg m-2 bg-cs-white p-1">PC {ataque}</p>
              <p className="rounded-lg m-2 bg-cs-white p-1">DF {defensa}</p>
            </div>
            <div className="flex">
              <p className="rounded-lg m-2 bg-cs-white p-1">Altura {altura}</p>
              <p className="rounded-lg m-2 bg-cs-white p-1">Peso {peso}</p>
            </div>
          </div>
        
      </div>
    </div>
  );
};
export default Card;
