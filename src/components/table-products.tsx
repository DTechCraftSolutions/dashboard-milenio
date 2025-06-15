"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  Table,
  Tag,
  Input,
  Select,
  Upload,
  Spin,
  Button,
} from "antd";
import type { TableProps } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { api } from "@/axios/config";
import { toast, Toaster } from "sonner";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase";
import { theme as customTheme } from "@/styles/theme";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl: string;
}

interface TableProductsProps {
  products: Product[];
  filter: string;
  getAllProducts: () => void;
}

interface DataType {
  key: string;
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string;
}

export function TableProductsComponent({
  products,
  filter,
  getAllProducts,
}: TableProductsProps) {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [editData, setEditData] = useState<{
    name: string;
    description: string;
    price: string;
    category: string;
    imageUrl: string;
  }>({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // load categories once
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await api.get("/categories/list");
        setCategories(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Erro ao carregar categorias");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // format products into table data
  useEffect(() => {
    setTableLoading(true);
    try {
      const formatted = products
        .filter((p) => p.categoryId.includes(filter))
        .map((p) => {
          const cat = categories.find((c) => c.id === p.categoryId);
          return {
            key: p.id,
            name: p.name,
            description: p.description,
            price: (p.price / 100).toFixed(2),
            category: cat?.name || "—",
            imageUrl: p.imageUrl,
          };
        });
      setDataSource(formatted);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao formatar dados dos produtos");
    } finally {
      setTableLoading(false);
    }
  }, [products, filter, categories]);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Imagem",
      dataIndex: "imageUrl",
      key: "image",
      width: 100,
      render: (url) => (
        <div className="flex justify-center">
          <img
            src={url}
            alt="Produto"
            className="w-16 h-16 object-cover rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          />
        </div>
      ),
    },
    { 
      title: "Nome", 
      dataIndex: "name", 
      key: "name",
      width: 200,
      render: (text) => (
        <span className="font-medium text-gray-700">{text}</span>
      )
    },
    { 
      title: "Descrição", 
      dataIndex: "description", 
      key: "description",
      width: 300,
      render: (text) => (
        <span className="text-gray-600 line-clamp-2">{text}</span>
      )
    },
    {
      title: "Preço",
      dataIndex: "price",
      key: "price",
      width: 120,
      render: (text) => (
        <span className="font-semibold text-green-600">
          R$ {text}
        </span>
      ),
    },
    {
      title: "Categoria",
      dataIndex: "category",
      key: "category",
      width: 150,
      render: (tag) => (
        <Tag 
          color="blue" 
          className="px-3 py-1 rounded-full text-xs font-medium"
          style={{ 
            backgroundColor: `${customTheme.colors.primary.main}15`,
            color: customTheme.colors.primary.main,
            border: 'none'
          }}
        >
          {tag}
        </Tag>
      ),
    },
    {
      title: "Ações",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="text"
            icon={<EditOutlined />}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            onClick={() => openEditModal(record.key)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            className="text-red-600 hover:text-red-800 hover:bg-red-50"
            onClick={() => openDeleteModal(record.key)}
          />
        </div>
      ),
    },
  ];

  function openEditModal(id: string) {
    const prod = products.find((p) => p.id === id);
    if (!prod) return;
    setSelectedId(id);
    setEditData({
      name: prod.name,
      description: prod.description,
      price: (prod.price / 100).toFixed(2),
      category: prod.categoryId,
      imageUrl: prod.imageUrl,
    });
    setNewImageFile(null);
    setIsEditModalOpen(true);
  }

  async function handleEditSave() {
    if (!selectedId) return;
    setLoading(true);
    try {
      let uploadedUrl = editData.imageUrl;
      if (newImageFile) {
        const storageRef = ref(storage, `images/${newImageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, newImageFile);
        await new Promise<void>((res, rej) =>
          uploadTask.on(
            "state_changed",
            null,
            rej,
            async () => {
              uploadedUrl = await getDownloadURL(uploadTask.snapshot.ref);
              res();
            }
          )
        );
      }
      const payload = {
        name: editData.name,
        description: editData.description,
        price: parseFloat(editData.price.replace(",", ".")) * 100,
        categoryId: editData.category,
        imageUrl: uploadedUrl,
      };
      await api.put(`/products/update/${selectedId}`, payload);
      toast.success("Produto atualizado com sucesso!");
      getAllProducts();
    } catch (e) {
      console.error(e);
      toast.error("Erro ao atualizar produto.");
    } finally {
      setLoading(false);
      closeEditModal();
    }
  }

  function closeEditModal() {
    setIsEditModalOpen(false);
    setEditData({ name: "", description: "", price: "", category: "", imageUrl: "" });
    setNewImageFile(null);
  }

  function openDeleteModal(id: string) {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  }

  async function handleDelete() {
    if (!selectedId) return;
    try {
      await api.delete(`/products/delete/${selectedId}`);
      toast.success("Produto deletado!");
      getAllProducts();
    } catch (e) {
      console.error(e);
      toast.error("Erro ao deletar produto.");
    } finally {
      setIsDeleteModalOpen(false);
    }
  }

  return (
    <>
      <Toaster position="bottom-right" richColors />
      <Spin spinning={loading}>
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Produtos</h2>
            <p className="text-sm text-gray-500 mt-1">Gerencie seus produtos e estoque</p>
          </div>
          <Table
            columns={columns}
            dataSource={dataSource}
            loading={tableLoading}
            pagination={{
              current: currentPage,
              pageSize,
              total: dataSource.length,
              locale: { items_per_page: "/ página" },
              showSizeChanger: true,
              showTotal: (total) => `Total de ${total} itens`,
              className: "px-6",
            }}
            onChange={(p) => {
              setCurrentPage(p.current || 1);
              setPageSize(p.pageSize || 10);
            }}
            rowKey="key"
            scroll={{ x: 1200 }}
            className="ant-table-striped"
          />
        </div>
      </Spin>

      {/* Edit Modal */}
      <Modal
        title={
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-gray-800">Editar Produto</span>
            <span className="text-sm text-gray-500 mt-1">Atualize as informações do produto</span>
          </div>
        }
        open={isEditModalOpen}
        okText="Salvar"
        onOk={handleEditSave}
        onCancel={closeEditModal}
        okButtonProps={{ 
          className: "bg-blue-500 text-white hover:bg-blue-600",
          loading: loading
        }}
        cancelButtonProps={{ className: "hover:bg-gray-100" }}
        width={700}
      >
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Nome</label>
              <Input
                placeholder="Nome do produto"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Preço</label>
              <Input
                placeholder="Preço"
                value={editData.price}
                onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                className="rounded-md"
                prefix="R$"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Descrição</label>
            <Input.TextArea
              placeholder="Descrição do produto"
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              className="rounded-md"
              rows={4}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Categoria</label>
            <Select
              placeholder="Selecione uma categoria"
              value={editData.category || undefined}
              onChange={(v) => setEditData({ ...editData, category: v })}
              options={categories.map((c) => ({ value: c.id, label: c.name }))}
              className="w-full rounded-md"
            />
          </div>

          <div className="flex flex-col items-center gap-4 p-6 border rounded-lg bg-gray-50">
            <img
              src={newImageFile ? URL.createObjectURL(newImageFile) : editData.imageUrl}
              alt="preview"
              className="w-40 h-40 object-cover rounded-lg shadow-sm"
            />
            <Upload
              beforeUpload={(file) => {
                setNewImageFile(file as File);
                return false;
              }}
              showUploadList={false}
            >
              <Button 
                icon={<UploadOutlined />}
                className="bg-white hover:bg-gray-50 border-gray-300"
              >
                Alterar Imagem
              </Button>
            </Upload>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        title={
          <div className="flex flex-col items-center">
            <DeleteOutlined className="text-4xl text-red-500 mb-4" />
            <span className="text-xl font-semibold text-gray-800">Deletar Produto</span>
          </div>
        }
        open={isDeleteModalOpen}
        okText="Deletar"
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        okButtonProps={{ 
          className: "bg-red-500 text-white hover:bg-red-600",
          loading: loading
        }}
        cancelButtonProps={{ className: "hover:bg-gray-100" }}
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <p className="text-gray-700 text-center">
            Tem certeza que deseja deletar este produto? Esta ação não pode ser desfeita.
          </p>
        </div>
      </Modal>
    </>
  );
}
