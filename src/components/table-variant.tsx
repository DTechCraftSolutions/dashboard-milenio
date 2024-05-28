"use client";
import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { api } from "@/axios/config";

interface DataType {
  key: string;
  name: string;
  quantity: number;
  productName: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Nome",
    key: "name",
    dataIndex: "name",
    render: (_, { name: tags }) => <Tag color="geekblue">{tags}</Tag>,
  },
  {
    title: "Quantidade",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Nome do Produto",
    dataIndex: "productName",
    key: "productName",
  },
];
export function VariantTableComponent() {
  const [data, setData] = useState<DataType[]>([]);
  async function getAllVariants() {
    try {
      const response = await api.get("/variants/list");
      console.log("response:", response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllVariants();
  }, []);

  return (
    <Table className="border rounded-md" columns={columns} dataSource={data} />
  );
}
