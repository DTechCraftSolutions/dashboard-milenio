import { MenuProps } from "antd";
import Link from "next/link";

import {
  AppstoreOutlined,
  ProductOutlined,
  UserOutlined,
  PieChartOutlined,
  FormOutlined,
  HistoryOutlined,
  FireOutlined,
  NotificationOutlined,
  LineChartOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  FileSearchOutlined,
  FileImageOutlined,
  FundOutlined,
  PictureOutlined,
  QrcodeOutlined,
  ShoppingOutlined,
  TagsOutlined,
  SolutionOutlined,
} from "@ant-design/icons";

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

export function ItensComponet(collapsed: any) {
  const items: MenuItem[] = [
    getItem(
      <Link href={"/"}>
        {collapsed ? (
          "Painel de Controle"
        ) : (
          <div className="text-blue-400">Painel de Controle</div>
        )}
      </Link>,
      "painel-de-controle",
      <div>
        <AppstoreOutlined
          style={{ fontSize: "24px" }}
          className="text-blue-300"
        />
      </div>
    ),
    getItem(
      <div className="text-white">Produtos</div>,
      "Produtos",
      <div>
        <ProductOutlined
          style={{ fontSize: "24px" }}
          className="text-blue-300"
        />
      </div>,
      [
        getItem(
          <Link href={"/painel-de-controle/gerenciar-produtos"}>
            {collapsed ? (
              "Gerenciar Produtos"
            ) : (
              <div className="text-blue-400">Produtos</div>
            )}
          </Link>,
          "painel-de-controle/gerenciar-produtos",
          <div>
            {!collapsed && (
              <PieChartOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
              />
            )}
          </div>
        ),
        getItem(
          <Link
            href={"/painel-de-controle/categorias-produtos"}
            className="text-white"
          >
            {collapsed ? (
              "Categorias "
            ) : (
              <div className="text-blue-400">Categorias</div>
            )}
          </Link>,
          "painel-de-controle/categorias-produtos",
          <div>
            {!collapsed && (
              <FormOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
              />
            )}
          </div>
        ),
      ]
    ),
    getItem(
      <div className="text-white">Promocões</div>,
      "4",
      <div className="">
        <NotificationOutlined
          style={{ fontSize: "24px" }}
          className="text-blue-300"
        />
      </div>,
      [
        getItem(
          <Link href={"/criar-promocoes"} className="text-white">
            {collapsed ? (
              "Criar Promoção"
            ) : (
              <div className="text-blue-400">Criar Promoção</div>
            )}
          </Link>,
          "4.1",
          <div>
            {!collapsed && (
              <FireOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
              />
            )}
          </div>
        ),
        getItem(
          <Link href={"/gerenciar-promocoes"} className="text-white">
            {collapsed ? (
              "Gerenciar Promoção"
            ) : (
              <div className="text-blue-400">Gerenciar Promoção</div>
            )}
          </Link>,
          "4.2",
          <div>
            {!collapsed && (
              <LineChartOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
              />
            )}
          </div>
        ),
        getItem(
          <Link href={"/historico-promocoes"} className="text-white">
            {collapsed ? (
              "Histórico de Promoção"
            ) : (
              <div className="text-blue-400">Histórico de Promoção</div>
            )}
          </Link>,
          "4.3",
          <div>
            {!collapsed && (
              <HistoryOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
              />
            )}
          </div>
        ),
      ]
    ),
    getItem(
      <div className="text-white">Pedidos</div>,
      "5",
      <div>
        <FileDoneOutlined
          style={{ fontSize: "24px" }}
          className="text-blue-300"
        />
      </div>,
      [
        getItem(
          <Link href={"/visualizar-pedidos"} className="text-white">
            {collapsed ? (
              "Visualizar Pedidos"
            ) : (
              <div className="text-blue-400">Visualizar Pedidos</div>
            )}
          </Link>,
          "5.1",
          <div>
            {!collapsed && (
              <FileTextOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
              />
            )}
          </div>
        ),
        getItem(
          <Link href={"/gerar-relatorios-pedidos"} className="text-white">
            {collapsed ? (
              "Gerar Relatórios"
            ) : (
              <div className="text-blue-400">Gerar Relatórios</div>
            )}{" "}
          </Link>,
          "5.2",
          <div>
            {!collapsed && (
              <FileSearchOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
              />
            )}
          </div>
        ),
      ]
    ),
    getItem(
      <div className="text-white">Banners</div>,
      "6",
      <div>
        <FileImageOutlined
          style={{ fontSize: "24px" }}
          className="text-blue-300"
        />
      </div>,
      [
        getItem(
          <Link href={"/gerenciar-banners"} className="text-white">
            {collapsed ? (
              "Gerenciar Banners"
            ) : (
              <div className="text-blue-400">Gerenciar Banners</div>
            )}
          </Link>,
          "6.1",
          <div>
            {!collapsed && (
              <FundOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
              />
            )}
          </div>
        ),
        getItem(
          <Link href={"/criar-novos-banners"} className="text-white">
            {collapsed ? (
              "Criar Novos Banners"
            ) : (
              <div className="text-blue-400">Criar Novos Banners</div>
            )}
          </Link>,
          "6.2",
          <div>
            {!collapsed && (
              <PictureOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
              />
            )}
          </div>
        ),
      ]
    ),
    getItem(
      <div className="text-white">Cupons</div>,
      "7",
      <div>
        <QrcodeOutlined
          style={{ fontSize: "24px" }}
          className="text-blue-300"
        />
      </div>,
      [
        getItem(
          <Link href={"/criar-cupons"} className="text-white">
            {collapsed ? (
              "Criar Cupons"
            ) : (
              <div className="text-blue-400">Criar Cupons</div>
            )}{" "}
          </Link>,
          "7.1",
          <div>
            {!collapsed && (
              <ShoppingOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
              />
            )}
          </div>
        ),
        getItem(
          <Link href={"/gerenciar-cupons"} className="text-white">
            {collapsed ? (
              "Gerenciar Cupons"
            ) : (
              <div className="text-blue-400">Gerenciar Cupons</div>
            )}{" "}
          </Link>,
          "7.2",
          <div>
            {!collapsed && (
              <TagsOutlined
                style={{ fontSize: "24px" }}
                className="text-blue-300"
              />
            )}
          </div>
        ),
      ]
    ),
  ];

  return {
    items,
  };
}
