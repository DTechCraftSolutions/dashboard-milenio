"use client";
import React from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

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

const data: DataType[] = [
  {
    key: "1",
    name: "P",
    quantity: 5,
    productName: "Camisa",
  },
  {
    key: "2",
    name: "M",
    quantity: 10,
    productName: "Camisa",
  },
  {
    key: "3",
    name: "G",
    quantity: 3,
    productName: "Camisa",
  },
  {
    key: "4",
    name: "Branca",
    quantity: 5,
    productName: "Caneca",
  },
  {
    key: "5",
    name: "azul",
    quantity: 10,
    productName: "Caneca",
  },
];

export function VariantTableComponent() {
  return (
    <Table className="border rounded-md" columns={columns} dataSource={data} />
  );
}
