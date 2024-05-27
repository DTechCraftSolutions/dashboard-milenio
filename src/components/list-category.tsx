"use client";
import React from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface DataType {
  key: string;
  category: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Categoria",
    key: "category",
    dataIndex: "category",
    render: (_, { category: tags }) => <Tag color="geekblue">{tags}</Tag>,
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
    category: "farda",
  },
];

export function ListCategoryComponent() {
  return (
    <Table className="border rounded-md" columns={columns} dataSource={data} />
  );
}
