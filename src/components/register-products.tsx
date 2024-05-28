"use client";
import { Button, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { FormEvent, useEffect, useState } from "react";
import { api } from "@/axios/config";

const props: UploadProps = {
  onChange({ file, fileList }) {
    if (file.status !== "uploading") {
      console.log("file:", file, "fileList:", fileList);
    }
  },
};
export function RegisterProductsComponent() {
  const [categories, setCategories] = useState<any>([]);
  const [data, setData] = useState<any>({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  async function getAllCategories() {
    try {
      const response = await api.get("/categories/list");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function registerProduct(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      //esperar firebase com a url da imagem

      await api.post("/products/create", {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price.replace(",", ".")) * 100,
        categoryId: data.category,
        valuePromotionInPercent: null,
        imageUrl: "https://via.placeholder.com/150",
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div className="flex flex-col w-full">
      <form
        onSubmit={(e) => registerProduct(e)}
        className="border w-11/12 flex flex-col gap-10 p-5 h-full rounded-lg"
      >
        <div className="flex gap-5">
          <Input
            className="p-2"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="Nome do produto"
            type="text"
          />
          <Input
            className="p-2"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            placeholder="Descrição"
            type="text"
          />
        </div>

        <div className="flex gap-5">
          <Input
            className="p-2"
            value={data.price}
            onChange={(e) => setData({ ...data, price: e.target.value })}
            placeholder="Preço"
            type="text"
          />
          <Select
            size="large"
            className="w-full"
            placeholder="Selecione a categoria"
            onChange={(value) => setData({ ...data, category: value })}
            options={categories.map((category: any) => ({
              value: category.id,
              label: category.name,
            }))}
          />
        </div>

        <div className="flex flex-col gap-2 border p-5 rounded-md bg-zinc-100">
          <label> Adicione uma imagem: </label>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </div>
        <div className="flex justify-end items-end w-full pt-10">
          <button
            type="submit"
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
