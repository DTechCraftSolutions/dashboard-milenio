"use client";
import React, { useEffect, useState } from "react";
import { Avatar, List, message } from "antd";
import VirtualList from "rc-virtual-list";

interface CategoryItem {
  name: string;
}

const ContainerHeight = 400;

export function ListCategoryComponent() {
  const [data, setData] = useState<CategoryItem[]>([
    { name: "Farda" },
    { name: "Bolsa" },
    { name: "Caneca" },
    { name: "Mochila Escolar" },
    // Adicione mais categorias aqui...
  ]);

  return (
    <List className="border rounded-md p-5">
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="name"
      >
        {(item: CategoryItem) => (
          <List.Item key={item.name}>
            <List.Item.Meta title={<a>Categoria</a>} description={item.name} />
            <div className="flex gap-2">
              <button
                className="bg-blue-500 hover:bg-blue-500/70 text-white 
              font-bold py-2 px-4 rounded transition-all duration-500"
              >
                Editar
              </button>
              <button
                className="bg-[#E72F2B] hover:bg-[#E72F2B]/70
               text-white font-bold py-2 px-4 rounded transition-all duration-500 "
              >
                Excluir
              </button>
            </div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
}
