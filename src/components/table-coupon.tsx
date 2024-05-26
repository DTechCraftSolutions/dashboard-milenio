"use client";
import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  code: string;
  discount: number;
  type: string;
  expiresIn: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Código",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Desconto",
    dataIndex: "discount",
    key: "discount",
  },
  {
    title: "Tipo",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Expira em",
    dataIndex: "expiresIn",
    key: "expiresIn",
  },
];

const data: DataType[] = [
  {
    key: "1",
    code: "string",
    discount: 20,
    type: "string",
    expiresIn: "26/05/2023 - 22:00:00",
  },
  // Adicione mais dados aqui...
];

export function TableCouponComponent() {
  return (
    <Table className="border rounded-md" columns={columns} dataSource={data} />
  );
}
