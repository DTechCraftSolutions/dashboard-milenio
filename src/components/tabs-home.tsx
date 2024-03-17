"use client";
import React, { useState } from "react";
import { Radio, Tabs } from "antd";
import type { TabsProps } from "antd";
import { ChartSales } from "./chart-sales";

export function TabsHome() {
  const [valueButton, setValueButton] = useState("1");

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <div className="text-xl font-semibold">Métricas</div>,
      children: (
        <div className="flex flex-col gap-5 pt-10">
          <Radio.Group
            buttonStyle="solid"
            defaultValue={valueButton}
            onChange={(e) => setValueButton(e.target.value)}
          >
            <Radio.Button value="1">Geral</Radio.Button>
            <Radio.Button value="2">Estoque</Radio.Button>
            <Radio.Button value="3">Lucro</Radio.Button>
          </Radio.Group>
          {valueButton === "1" && (
            <div className="pt-10">
              <ChartSales />
            </div>
          )}

          {valueButton === "2" && (
            <div className="pt-5">grafico de estoque</div>
          )}

          {valueButton === "3" && <div className="pt-5">grafico de lucro</div>}
        </div>
      ),
    },
    {
      key: "2",
      label: <div className="text-xl font-semibold">Movimentação</div>,
      children: <div>minhas movimentações</div>,
    },
    {
      key: "3",
      label: <div className="text-xl font-semibold">Retenções</div>,
      children: <div>minhas retenções</div>,
    },
  ];

  return <Tabs className="" defaultActiveKey="1" items={items} />;
}
