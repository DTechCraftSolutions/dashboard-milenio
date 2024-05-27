import { Input, Select } from "antd";

export function RegisterVariantsComponent() {
  return (
    <div className="flex flex-col w-full">
      <form className="border w-11/12 flex flex-col gap-10 p-5 h-full rounded-lg">
        <div className="flex gap-5">
          <Input className="p-2" placeholder="Nome" type="text" />
          <Input className="p-2 " placeholder="Quantidade" type="text" />
        </div>

        <div className="flex gap-5">
          <Select
            size="large"
            className="w-full"
            placeholder="Selecione o Produto"
          />
        </div>

        <div className="flex justify-end items-end w-full pt-10">
          <button
            className="bg-[#E72F2B] text-white font-bold py-2 px-4 rounded
        hover:bg-[#E72F2B]/70 transition-all duration-500 w-1/6 "
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
