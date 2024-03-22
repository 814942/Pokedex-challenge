import { useEffect, useState } from "react";

import { ITypes } from "@/interfaces/pokemons.interface"

interface IDropdownProps {
  data: ITypes[];
  onChange: (value: string) => void;
}

const Dropdown = ({ data, onChange }: IDropdownProps) => {
  const [inputName, setInputName] = useState<string>("Tipos de pokemones")
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [dropdownStyles, setDropdownStyles] = useState<string>("hidden")

  const handleDropdown = (e: React.MouseEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value
    setInputName(value)
    setIsOpen(false)
    onChange(value);
  }

  const handleOpenDropdown = () => {
    setIsOpen(true)
  }

  useEffect(() => {
    if(isOpen) {
      setDropdownStyles("block")
    }
    else {
      setDropdownStyles("hidden")
    }
  }, [isOpen])

  return (
    <>
    <label onClick={handleOpenDropdown} className="relative flex items-center justify-center w-[400px] text-cs-gray-300 bg-cs-white h-9	bg-cs-white rounded-tl-lg	rounded-bl-lg">
      <input type="checkbox" className="hidden peer" />
      <div className="cursor-pointer after:text-xs after:ml-1 after:inline-flex after:items-center peer-checked:after:-rotate-180 after:transition-transform">
        {inputName}
      </div>
      <div className={`${dropdownStyles} z-50 absolute top-full	w-full text-cs-gray-300 bg-cs-white rounded-tl-lg	rounded-bl-lg transition-opacity opacity-0 peer-checked:opacity-100 peer-checked:pointer-events-auto`}>
        <ul className="bg-cs-white border-2 border-solid border-cs-gray-100">
          {data?.length ? data.map((option: ITypes) => {
            return (
              <li key={option.id}>
                <label className="flex whitespace-nowrap cursor-pointer transition-colors hover:bg-cs-gray-100">
                  <input
                    name={inputName}
                    defaultValue={option.nombre}
                    className={`cursor-pointer hover:bg-cs-gray-100 px-2 py-1`}
                    onClick={handleDropdown}
                  />
                </label>
              </li>
            );
          }) : <p>Data not found</p>
          }
        </ul>
      </div>
    <div className="bg-cs-gray-200 cursor-pointer absolute inset-y-0 right-0 flex items-center px-2 text-cs-gray-200">
      <svg className="text-cs-white fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    </label>
  </>
  )
}

export default Dropdown