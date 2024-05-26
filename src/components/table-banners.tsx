"use client";
import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface DataType {
  key: string;
  name: string;
  description: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Nome do Banner",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Descrição",
    dataIndex: "description",
    key: "description",
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
    name: "Banner 1",
    description: "Descrição do Banner 1",
  },
  // Adicione mais dados aqui...
];

export function TableBannerComponent() {
  return (
    <Table className="border rounded-md" columns={columns} dataSource={data} />
  );
}
