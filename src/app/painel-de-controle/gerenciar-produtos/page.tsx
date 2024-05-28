"use client";
import { api } from "@/axios/config";
import { FilterProductsComponent } from "@/components/filter-products";
import { TableProductsComponent } from "@/components/table-products";
import { useEffect, useState } from "react";

export default function Produtos() {
  const [categories, setCategories] = useState<any>([]);
  const [filteredProducts, setFilteredProducts] = useState<any>([]);
  async function getAllCategories() {
    try {
      const response = await api.get("/categories/list");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-semibold">Meus Produtos - 3° Milenio</h1>
      <div className="pt-5 w-full">
        <FilterProductsComponent
          category={categories}
          setFilter={setFilteredProducts}
        />
      </div>
      <div className="pt-10">
        <TableProductsComponent />
      </div>
    </div>
  );
}
