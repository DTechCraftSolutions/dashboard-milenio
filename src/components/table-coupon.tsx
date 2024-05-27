"use client";
import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

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
  {
    title: "Ações",
    key: "actions",
    render: () => (
      <div className="flex gap-5">
        <div className="cursor-pointer">
          <EditOutlined className="text-blue-700 text-[16px]	" />
        </div>
        <div className="cursor-pointer">
          <DeleteOutlined className="text-red-500 text-[16px]	" />
        </div>
      </div>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    code: "MILENIO20",
    discount: 20,
    type: "desconto",
    expiresIn: "26/05/2023 - 22:00:00",
  },
  // Adicione mais dados aqui...
];

export function TableCouponComponent() {
  return (
    <Table className="border rounded-md" columns={columns} dataSource={data} />
  );
}
