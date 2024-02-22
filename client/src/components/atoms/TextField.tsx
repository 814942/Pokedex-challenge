import { useState } from "react";

interface ITextFieldProps {
  onChange: (value: string) => void,
}

const TextField = ({ onChange }: ITextFieldProps) => {
  const [inputState, setInputState] = useState<string>("");

  const handleChangeInput = (e: any) => {
    const value: string = e.target.value
    setInputState(value.toLocaleLowerCase());
  }

  const handleSubmit = () => {
    setInputState("")
    onChange(inputState)
  };
  return (
    <div>
      <div>
        <input
          onChange={handleChangeInput}
          className="h-9	bg-cs-white rounded-tl-lg	rounded-bl-lg	 pl-4"
          type="text"
          name="game"
          value={inputState}
          placeholder="Nombre del pokemon"
          required
        />
        <button 
          className={`${!inputState ? "bg-cs-gray-100" : "bg-cs-white"} h-9	 pl-4 border-l-2	rounded-tr-lg	rounded-br-lg pr-4 shadow-lg hover:shadow-xl`}
          onClick={handleSubmit}
          disabled={!inputState}
        >
          Buscar
        </button>
      </div>
    </div>
  )
}

export default TextField