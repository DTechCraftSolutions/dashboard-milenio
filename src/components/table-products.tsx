import React, { useEffect, useState } from "react";
import { Modal, Space, Table, Tag, Button, Input } from "antd";
import type { TableProps } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { api } from "@/axios/config";

interface DataType {
  key: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface TableProductsProps {
  products: any;
  filter: any;
}
export function TableProductsComponent({
  products,
  filter,
}: TableProductsProps) {
  const [productCustom, setProductCustom] = useState<any>([]);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState<any>(null);

  const showModalDelete = (id: string) => {
    setSelectedId(id);
    setIsModalOpenDelete(true);
  };

  const handleOkDelete = () => {
    deleteProduct(selectedId);
    setIsModalOpenDelete(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const showModalEdit = (id: string) => {
    setSelectedId(id);
    setIsModalOpenEdit(true);
  };

  const handleOkEdit = () => {
    updateProduct(selectedId);
    setIsModalOpenEdit(false);
  };

  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
  };

  async function deleteProduct(id: string) {
    try {
      await api.delete(`/products/delete/${id}`);
    } catch (error) {
      console.error(error);
    } finally {
      window.location.reload();
    }
  }

  async function updateProduct(id: string) {
    try {
      // Atualizar produto aqui
      // Você precisará adicionar a lógica para obter os novos dados do produto
      await api.put(`/products/update/${id}`, {
        // Dados do produto atualizados
      });
    } catch (error) {
      console.error(error);
    } finally {
      window.location.reload();
    }
  }

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
      title: "Ações",
      key: "actions",
      render: (_, { key: id }) => (
        <div className="flex gap-5">
          <div onClick={() => showModalEdit(id)} className="cursor-pointer">
            <EditOutlined className="text-blue-700 text-[16px]	" />
          </div>
          <div onClick={() => showModalDelete(id)} className="cursor-pointer">
            <DeleteOutlined className="text-red-500 text-[16px]	" />
          </div>
        </div>
      ),
    },
  ];
  async function getCategoryById(id: string) {
    try {
      const response = await api.get(`/categories/get-category/${id}`);
      return response.data.name;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const productsCustom = products
      .filter((product: any) => product.categoryId.includes(filter))
      .map((product: any) => {
        return {
          key: product.id,
          name: product.name,
          description: product.description,
          price: parseFloat((product.price / 100) as any).toFixed(2),
          category: getCategoryById(product.categoryId),
        };
      });
    setProductCustom(productsCustom);
  }, [products, filter]);
  return (
    <>
      <Table
        className="border rounded-md"
        columns={columns}
        dataSource={productCustom}
      />
      <Modal
        title={`Editar Produto`}
        open={isModalOpenEdit}
        okText="Salvar"
        onOk={handleOkEdit}
        okButtonProps={{ className: "bg-blue-500 text-white" }}
        onCancel={handleCancelEdit}
        cancelButtonProps={{ className: "bg-red-500 text-white" }}
      >
        <div className="flex flex-col gap-2">
          <Input className="p-2 w-1/2" placeholder="Nome" type="text" />
          <Input className="p-2 w-1/2" placeholder="Descrição" type="text" />
          <Input className="p-2 w-1/2" placeholder="Preço" type="text" />
        </div>
      </Modal>
      <Modal
        title={`Deletar Produto`}
        open={isModalOpenDelete}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
        okButtonProps={{ className: "bg-blue-500 text-white" }}
        okText="Deletar"
        cancelButtonProps={{ className: "bg-red-500 text-white" }}
      >
        <p>Tem certeza que deseja deletar esta categoria?</p>
      </Modal>
    </>
  );
}
