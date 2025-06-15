"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Form, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { theme as customTheme } from "@/styles/theme";
import { toast, Toaster } from "sonner";
import { Login } from "@/firebase/functions";

interface LoginFormValues {
  email: string;
  password: string;
}

export function LoginComponent() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(values: LoginFormValues) {
    setLoading(true);
    try {
      const response = await Login({
        email: values.email,
        password: values.password,
      });
      
      if (response.success) {
        Cookies.set("userId", "fakerUserId");
        toast.success("Login realizado com sucesso!");
        setTimeout(() => {
          router.push("/");
        }, 1500);
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao efetuar o login 😥");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <Toaster position="bottom-right" richColors />
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Entrar</h2>
        <p className="text-gray-500 mt-2">
          Entre com suas credenciais para acessar o dashboard
        </p>
      </div>

      <Form
        name="login"
        onFinish={handleLogin}
        layout="vertical"
        requiredMark={false}
        className="space-y-4"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Por favor, insira seu email" },
            { type: "email", message: "Email inválido" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="Email"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Por favor, insira sua senha" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Senha"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
              Lembrar-me
            </label>
          </div>
          <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
            Esqueceu a senha?
          </a>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full h-11 rounded-lg bg-[#232A60] hover:bg-[#1A1F4A]"
          >
            Entrar
          </Button>
        </Form.Item>
      </Form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Não tem uma conta?{" "}
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
            Entre em contato
          </a>
        </p>
      </div>
    </div>
  );
}
