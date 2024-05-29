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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  async function getProductById(id: string) {
    try {
      const response = await api.post(`/products/getById/${id}`);
      return response.data.name;
    } catch (error) {
      console.error(error);
    }
  }
  async function getAllVariants() {
    try {
      const response = await api.get("/variants/list");
      const dataCustom = [];

      for (let item of response.data) {
        const productName = await getProductById(item.productId);
        dataCustom.push({
          key: item.id,
          name: item.name,
          quantity: item.amount,
          productName: productName,
        });
      }

      setData(dataCustom);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllVariants();
  }, []);

  return (
    <Table
      className="border rounded-md"
      columns={columns}
      dataSource={data.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      )}
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: data.length,
        locale: { items_per_page: "/ página" },
        style: { marginRight: "9rem" },
      }}
      onChange={handleTableChange}
    />
  );
}
