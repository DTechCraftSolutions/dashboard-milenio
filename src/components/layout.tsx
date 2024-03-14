"use client";
import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Avatar, Popover, MenuProps } from "antd";
import { ItensComponet } from "./itens-side-bar";
const { Header, Sider, Content } = Layout;
import Image from "next/image";
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
  const { items } = ItensComponet(collapsed);
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

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        width={260}
        color="#232A60"
        style={{
          background: "#232A60",
        }}
        className="h-screen bg-[#232A60]"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div
          className="flex justify-center items-center text-red-600 text-xl
           py-5 pb-12"
        >
          <Image src="/assets/logo.png" width={40} height={100} alt="logo" />
        </div>
        <Menu
          className="bg-[#232A60] text-[16px]"
          theme="light"
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
            className="text-red-500"
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
                style={{ backgroundColor: "#232A60" }}
                size={47}
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
