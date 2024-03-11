"use client";
import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  AppstoreOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  Avatar,
  Popover,
  Divider,
  MenuProps,
} from "antd";
import Link from "next/link";

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export function LayoutComponent({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  const content = (
    <div className="flex flex-col justify-center items-center">
      <a
        className="flex justify-center hover:bg-gray-100 w-full items-center
        py-1 rounded-md cursor-pointer transition-all duration-300"
      >
        Sair
      </a>
    </div>
  );

  const items: MenuItem[] = [
    getItem(
      <Link href={"/"}>Painel de Controle</Link>,
      "1",
      <div>
        <AppstoreOutlined />
      </div>
    ),
    getItem(
      <Link href={"/produtos"}>Produtos</Link>,
      "2",
      <div>
        <ProductOutlined />
      </div>
    ),
    getItem(
      <Link href={"/upload-produtos"}>Upload de Produtos</Link>,
      "3",
      <div>
        <UploadOutlined />
      </div>
    ),
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        width={260}
        className="h-screen"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div
          className="flex justify-center items-center text-red-600 text-xl
           py-5 pb-14"
        >
          M
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          className="flex justify-between"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Button
            type="link"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 72,
              height: 72,
            }}
          />

          <div className="pr-5 cursor-pointer">
            <Popover
              content={content}
              title="Bem vindo ao dashboard"
              trigger="click"
            >
              <Avatar
                style={{ backgroundColor: "#072540" }}
                size={50}
                icon={<UserOutlined />}
              />
            </Popover>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
