import { Input } from "antd";

export function CreateCouponComponent() {
  return (
    <div className="flex flex-col w-full gap-5">
      <form className="border w-11/12 flex flex-col gap-10 p-5 h-full rounded-lg">
        <div className="flex gap-5">
          <Input className="p-2 " placeholder="Tipo do cupom" type="text" />
          <Input className="p-2 " placeholder="Código do cupom" type="text" />
        </div>
        <div className="flex gap-5">
          <Input className="p-2 " placeholder="Desconto" type="text" />
          <Input className="p-2" placeholder="Data de expiração" type="text" />
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
