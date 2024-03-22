import { ChangeEvent, useEffect, useState } from "react"
import useSWR from "swr/immutable";
import { mutate } from "swr";

import { APIManager } from "@/services/APIManager"
import Image from "next/image";
import { redirect } from "next/navigation";
import { usePokemonContext } from "@/context/data.context";

const manager = new APIManager()

const LandingPage = () => {
  const { setUser } = usePokemonContext()
  const { data } = useSWR(
    "/security/login", 
    path => manager.login(path, username), 
    { revalidateOnMount: false }
  )

  const [username, setUsername] = useState<string>("")
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setUsername(inputText)

    if (inputText) {
      setIsDisabled(false)
    }
    else {
      setIsDisabled(true)
    }
  }

  const handleSubmit= async () => {
    console.log("GO")
    mutate("security/login")
  }

  useEffect(() => {
    if(data && data.status === 200) {
      redirect("/home")
      setUser(data?.data!)
    }
  }, [data, setUser])

  return (
    <div className="h-screen flex">
      <div className="bg-[url('/mi-pais.jpg')] bg-cover bg-center bg-no-repeat w-4/6"></div>
      <div className="bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] relative border-l-[15px] border-black w-2/5">
        <Image 
          className="absolute left-[40%]" 
          alt="Loading..." 
          src={"/pikachu-pixel-art-png.png"}
          width={300}
          height={300}
        />
        <div className="max-w-80 p-8 text-cs-gray-200 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-2xl	border-0	text-center fixed top-1/2	left-1/2 translate-x-[-50%]	translate-y-[-50%] bg-cs-white absolute">
          <h1 className="text-2xl">Bienvenido</h1>
          <p className="pb-4 pt-4">Por favor ingrese su nombre</p>
          <input 
            id="name"
            type="text"
            name="name"
            value={username}
            placeholder="Ingrese su nombre"
            onChange={(e) => handleInputChange(e)}
            className="border-solid border-cs-gray-200 border-2 rounded-2xl text-black pl-4 text-center h-8"
            required
          />
          <button 
            className={`text-cs-white mt-4 h-8 border-2 border-solid rounded-2xl border-cs-white w-full shadow-2xl
              ${isDisabled ? "bg-cs-gray-100 text-cs-gray-200" : "hover:opacity-90 pointer bg-secondary"} 
            `}
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage