"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Table, Select, Tag, Modal, Button } from "antd";
import type { TablePaginationConfig } from "antd";
import { api } from "@/axios/config";
import { toast } from "sonner";
import { format } from "date-fns";

interface DataType {
  key: string;
  orderId: string;
  cartItem: {
    productId: string;
    variantId: string;
    quantity: number;
    observation?: string;
    prevStock: number;
    variantName: string;
    productName: string;
  }[];
  send_product: boolean;
  paymentStatus: string;
  shippingCost: number;
  totalAmount: number;
  user_address: string;
  client: string;
  user_email: string;
  user_telephone: string;
  created_at: string;
}

export function OrderTableComponent() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<DataType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const cancelOrder = async (id: string) => {
    try {
      await api.put(`/orders/cancel/${id}`);
      toast.success("Pedido cancelado com sucesso!");
      await fetchOrders();
      setIsModalVisible(false); // Fecha o modal após cancelar
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cancelar pedido!");
    }
  };

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`/orders/getAll`, {
        params: {
          page,
          status,
        },
      });

      const { data: orders, meta } = response.data;

      setData(
        orders.map((order: any) => ({
          key: order.id,
          orderId: order.id,
          cartItem: order.cartItem.map((item: any) => ({
            ...item,
            productName: item.product.name,
            variantName: item.variant.name,
          })),
          send_product: order.send_product,
          paymentStatus: order.paymentStatus,
          shippingCost: order.shippingCost,
          totalAmount: order.totalAmount,
          user_address: order.user_adress,
          client: order.user_name,
          user_email: order.user_email,
          user_telephone: order.user_telephone,
          created_at: order.createdAt,
        }))
      );
      setTotal(meta.totalCount);
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível buscar os pedidos, tente novamente 😥");
    } finally {
      setLoading(false);
    }
  }, [page, status]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);
  };

  const handleRowClick = (record: DataType) => {
    setSelectedOrder(record);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "Pedido ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Cliente",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "E-mail",
      dataIndex: "user_email",
      key: "user_email",
    },
    {
      title: "Telefone",
      dataIndex: "user_telephone",
      key: "user_telephone",
    },
    {
      title: "Endereço",
      dataIndex: "user_address",
      key: "user_address",
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status: string) => {
        const color = status === "approved" ? "green" : status === "pendente" ? "orange" : "red";
        return <Tag color={color}>{status.toUpperCase() === "APPROVED" ? "Aprovado" : status.toUpperCase() === "CANCELED" ? "Cancelado" : status}</Tag>;
      },
    },
    {
      title: "Total (R$)",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount: number) => `R$ ${(amount / 100).toFixed(2)}`, // Considerando que o valor está em centavos
    },
    {
      title: "Data",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => format(new Date(date), "dd/MM/yyyy"),
    },
  ];

  return (
    <div className="max-h-[50vh]">
      <div style={{ marginBottom: 16 }}>
        <Select
          placeholder="Filtre pelo status do pedido"
          onChange={(value) => setStatus(value)}
          style={{ width: 200 }}
          allowClear
          options={[
            {
              value: "pendente",
              label: "Pendente",
            },
            {
              value: "approved",
              label: "Aprovado",
            },
            {
              value: "canceled",
              label: "Cancelado",
            },
          ]}
        />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: total,
          showSizeChanger: false,
        }}
        onChange={handleTableChange}
        onRow={(record) => ({
          onClick: () => record.paymentStatus !== "canceled" && handleRowClick(record), // Abre o modal ao clicar no pedido
        })}
        rowKey="orderId"
      />
      <Modal
        title={`Itens do Pedido - ${selectedOrder?.orderId}`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Fechar
          </Button>,
          <Button
            key="cancelOrder"
            type="primary"
            danger
            onClick={() => selectedOrder && cancelOrder(selectedOrder.orderId)}
          >
            Cancelar Pedido
          </Button>,
        ]}
      >
        {selectedOrder?.cartItem.map((item, index) => (
          <div key={index} style={{ marginBottom: 8 }}>
            <p>
              <strong>Produto:</strong> {item.productName}
            </p>
            <p>
              <strong>Variante:</strong> {item.variantName} | <strong>Quantidade:</strong> {item.quantity}
            </p>
          </div>
        ))}
      </Modal>
    </div>
  );
}
