import { IPokemonAbilities } from "@/interfaces/pokemons.interface";

interface IDetailsTableProps {
  data: IPokemonAbilities[]
}

const DetailsTable = ({ data }: IDetailsTableProps) => {
  return (
    <div className="flex flex-col mb-6">
      <h1 className="text-secondary border border-cs-gray-200 border-b-4 font-semibold p-2 pl-8">Habilidades</h1>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-4">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light text-cs-gray-300 ">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="p-4">Nombre</th>
                  <th scope="col" className="p-4">Efecto</th>
                  <th scope="col" className="p-4">Descripcion</th>
                </tr>
              </thead>
              <tbody>
              {data?.length && data.map(({nombre, efecto, descripcion}: IPokemonAbilities) => {
                return (
                  <tr
                    key={nombre}
                    className="border-b transition duration-300 ease-in-out hover:bg-cs-gray-100 dark:border-neutral-500 dark:hover:bg-cs-gray-200 hover:text-cs-white"
                  >
                    <td className="p-4 font-medium capitalize">{nombre}</td>
                    <td className="p-4 font-medium">{efecto}</td>
                    <td className="p-4 font-medium">{descripcion}</td>
                  </tr>
                )
              })
                
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsTable