"use client";
import React from "react";
import { Table, Tag } from "antd";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  orderId: string;
  productId: string;
  quantity: number;
  paymentStatus: string;
  shippingCost: number;
  totalAmount: number;
  user_address: string;
  client: string;
  user_email: string;
  user_telephone: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "ID do Pedido",
    dataIndex: "orderId",
    key: "orderId",
  },
  {
    title: "Nome do Produto",
    dataIndex: "productId",
    key: "productId",
  },
  {
    title: "Quantidade",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Status do Pagamento",
    dataIndex: "paymentStatus",
    key: "paymentStatus",
  },
  {
    title: "Custo de Envio",
    dataIndex: "shippingCost",
    key: "shippingCost",
  },
  {
    title: "Valor Total",
    dataIndex: "totalAmount",
    key: "totalAmount",
  },
  {
    title: "Endereço do Cliente",
    dataIndex: "user_address",
    key: "user_address",
  },
  {
    title: "Cliente",
    dataIndex: "client",
    key: "client",
  },
  {
    title: "Email do Cliente",
    dataIndex: "user_email",
    key: "user_email",
  },
  {
    title: "Telefone do Cliente",
    dataIndex: "user_telephone",
    key: "user_telephone",
  },
];

const data: DataType[] = [
  {
    key: "1",
    orderId: "123456",
    productId: "camisa",
    quantity: 2,
    paymentStatus: "Pago",
    shippingCost: 10,
    totalAmount: 90,
    user_address: "Rua das Flores, 123",
    client: "João Silva",
    user_email: "joao.silva@example.com",
    user_telephone: "(11) 12345-6789",
  },
  // Adicione mais dados aqui...
];

export function OrderTableComponent() {
  return (
    <Table className="border rounded-md" columns={columns} dataSource={data} />
  );
}
