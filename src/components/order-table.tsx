"use client";
import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import { api } from "@/axios/config";
import { toast } from "sonner";

interface DataType {
  key: string;
  orderId: string;
  cartItem: {
    productId: string;
    variantId: string;
    quantity: number;
    observation?: string;
  }[];
  send_product: boolean;
  paymentStatus: string;
  shippingCost: number;
  totalAmount: number;
  user_address: string;
  client: string;
  user_email: string;
  user_telephone: string;
}

export function OrderTableComponent() {
  const [orders, setOrders] = useState<any[]>([]);
  const [customOrders, setCustomOrders] = useState<any[]>([]);
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "ID do Pedido",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Informação do Carrinho",
      dataIndex: "cartItem",
      key: "cartItem",
      render: (_, { cartItem }) => (
        <ul>
          {cartItem.length > 0 &&
            cartItem?.map((item) => (
              <Tag color="geekblue" key={item.productId}>
                <div>Produtos: {item.productId}</div>
                <div>Quatidade: {item.quantity} </div>
                <div>Variante: {item.variantId}</div>
                {item.observation && <div>Observação: {item.observation}</div>}
              </Tag>
            ))}
        </ul>
      ),
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
    {
      title: "Envio",
      key: "actions",
      render: (_, order) => (
        <button
          className="cursor-pointer"
          onClick={async () => await updateOrderStatus(order.orderId)}
        >
          <Tag color={order.send_product ? "green" : "orange"}>
            {order.send_product ? "Enviado" : "Pendente"}
          </Tag>
        </button>
      ),
    },
  ];

  async function updateOrderStatus(orderId: string) {
    try {
      const send_product = orders.find(
        (order) => order.id === orderId
      ).send_product;
      await api.put(`/orders/update/${orderId}`, {
        send_product: !send_product,
      });
      if (send_product === true) {
        toast.success("Pedido enviado! 🎉");
      }
      if (send_product === false) {
        toast.success("Pedido pendente de envio!");
      }
      getAllOrders();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar o status do pedido! 😥");
    }
  }

  async function getProductById(id: string) {
    try {
      const response = await api.post(`/products/getById/${id}`);
      return {
        name: response.data.name,
        quantity: response.data.amount,
      };
    } catch (error) {
      console.error(error);
    }
  }
  async function getVariantById(id: string) {
    try {
      const response = await api.get(`/variants/${id}`);
      return response.data.name;
    } catch (error) {
      console.error(error);
    }
  }
  async function getCartItemByOrderId(orderId: string) {
    try {
      const response = await api.post(`/cart-items/orderId/${orderId}`);
      const cartItemCustom = [];

      for (let item of response.data) {
        const product = await getProductById(item.productId);
        const variantName = await getVariantById(item.variantId);
        cartItemCustom.push({
          productId: product?.name,
          quantity: item.quantity,
          variantId: variantName,
          observation: item.observation,
        });
      }
      return cartItemCustom;
    } catch (error) {
      console.error(error);
    }
  }

  async function getAllOrders() {
    try {
      const response = await api.get("/orders/getAll");
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchOrders = async () => {
      const customOrders = [];
      for (let order of orders) {
        const cartItem = await getCartItemByOrderId(order.id);
        customOrders.push({
          key: order.id,
          orderId: order.id,
          cartItem: cartItem,
          send_product: order.send_product,
          paymentStatus: order.paymentStatus,
          shippingCost: order.shippingCost,
          totalAmount: order.totalAmount,
          user_address: order.user_adress,
          client: order.user_name,
          user_email: order.user_email,
          user_telephone: order.user_telephone,
        });
      }
      setCustomOrders(customOrders);
    };

    fetchOrders();
  }, [orders]);

  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <Table
      className="border rounded-md"
      columns={columns}
      dataSource={customOrders}
    />
  );
}
