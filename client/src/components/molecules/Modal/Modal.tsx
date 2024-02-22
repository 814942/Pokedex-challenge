import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { toast } from 'react-toastify';
import useSWR from "swr/immutable";
import { mutate } from "swr";

import { APIManager } from "@/services/APIManager"

interface IModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const Modal = ({ setIsOpen }: IModalProps) => {
  const manager = new APIManager()
  const { data } = useSWR(
    "/security/login", 
    path => manager.login(path, username), 
    { revalidateOnMount: false }
  )
  const [username, setUsername] = useState<string>("")
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
    setIsDisabled(false)
  }
  
  const handleSubmit= async () => {
    mutate("/security/login")
  }

  useEffect(() => {
    if(data) {
      if (data?.status === 200) {
        toast.success(`Bienvenido: ${data.data}`)
      }
      else {
        toast.error(`Algo salio mal: ${data?.message}`)
      }
      setIsOpen(false)
    }
  }, [data, setIsOpen])

  return (
    <div className="max-w-80 p-8 text-cs-white	shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-2xl	border-0	text-center fixed top-1/2	left-1/2 translate-x-[-50%]	translate-y-[-50%] bg-gradient-to-r from-[#FF416C] to-[#FF4B2B]">
        <h1 className="text-2xl">Pokedex</h1>
        <p>Bienvenido, por favor ingrese su nombre</p>
        <input 
          id="name"
          type="text"
          name="name"
          value={username}
          placeholder="Ingrese su nombre"
          onChange={(e) => handleInputChange(e)}
          className="rounded-2xl text-black pl-4 text-center"
          required
        />
        <button 
          className={`${isDisabled ? "bg-cs-gray-100" : "hover:opacity-90 pointer bg-primary"} text-cs-black mt-4	border-2	p-2	border-solid rounded-2xl border-cs-white`}
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          Entrar
        </button>
    </div>
  )
}

export default Modal