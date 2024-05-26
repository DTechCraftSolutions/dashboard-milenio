import { Select } from "antd";

export function FilterProductsComponent() {
  return (
    <div className="mt-5 ml-[0.6rem] flex gap-2 items-center">
      <div className="grid grid-cols-2 w-full gap-3 mr-5">
        <div className="flex gap-2 items-center">
          <label className="">Filtros</label>
          <Select className="w-full" placeholder="Selecione o nome " />
          <Select className="w-full" placeholder="Selecione a categoria" />
        </div>
      </div>
    </div>
  );
}
