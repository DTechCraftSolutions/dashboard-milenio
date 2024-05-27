"use client";

import { Divider } from "antd";
import { VariantTableComponent } from "./table-variant";

export function TabsHome() {
  return (
    <div>
      <h1 className="text-xl font-semibold">Estoque - 3° Milenio</h1>
      <Divider />
      <div className="pt-10">
        <VariantTableComponent />
      </div>
    </div>
  );
}
