"use client";
import React, { useState } from "react";
import { Input, Modal, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { FireOutlined } from "@ant-design/icons";

interface DataType {
  key: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export function PromotionProductsComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Preço",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Categoria",
      key: "category",
      dataIndex: "category",
      render: (_, { category: tags }) => <Tag color="geekblue">{tags}</Tag>,
    },
    {
      title: "Selecionar",
      key: "actions",
      render: () => (
        <div onClick={showModal} className="cursor-pointer">
          <FireOutlined className="text-red-400 text-[16px]" />
        </div>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "camisa",
      description: "farda do 3º milenio",
      price: 40,
      category: "farda",
    },
  ];

  return (
    <>
      <Table
        className="border rounded-md"
        columns={columns}
        dataSource={data}
      />

      <Modal
        title={<div>Adicionar Desconto</div>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { backgroundColor: "#E72F2B" } }}
      >
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <div className="font-semibold">Nome:</div>
            <div>Camisa</div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="font-semibold">Categoria:</div>
            <div>farda</div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="font-semibold">Descricão:</div>
            <div>farda do 3º milenio</div>
          </div>
          <div className="flex gap-2 pt-5 items-center">
            <label className="font-semibold">Desconto:</label>
            <Input
              className="w-1/6 bg-zinc-100"
              placeholder="Porcentagem de desconto"
              type="text"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
