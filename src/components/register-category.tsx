"use client";
import { Button, Input, Space } from "antd";
import { ListCategoryComponent } from "./list-category";

export function RegisterCategoryComponent() {
  return (
    <div
      className="bg-white 
    rounded-xl shadow-lg p-5 border border-zinc-200
    border-opacity-60"
    >
      <h1 className="text-xl font-semibold">Cadastre uma categoria</h1>

      <form className="pt-10 flex flex-col gap-5">
        <label className="font-semibold">Nome da categoria:</label>

        <Space.Compact style={{ width: "100%" }}>
          <Input
            className="w-1/4 border bg-zinc-100"
            placeholder="Nome da categoria"
          />
          <Button className="font-semibold h-10 bg-[#E72F2B] text-white">
            Cadastrar
          </Button>
        </Space.Compact>
      </form>

      <div className="pt-10">
        <h1 className="text-xl font-semibold pb-5">
          Lista de categorias cadastradas
        </h1>
        <div>
          <ListCategoryComponent />
        </div>
      </div>
    </div>
  );
}
