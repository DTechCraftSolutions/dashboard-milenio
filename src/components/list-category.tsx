"use client";
import React, { useEffect, useState } from "react";
import { Avatar, List, message } from "antd";
import VirtualList from "rc-virtual-list";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
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
            <div className="flex gap-5">
              <div className="cursor-pointer">
                <EditOutlined className="text-blue-700 text-[16px]	" />
              </div>
              <div className="cursor-pointer">
                <DeleteOutlined className="text-red-500 text-[16px]	" />
              </div>
            </div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
}
