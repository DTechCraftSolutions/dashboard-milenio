import { OrderTableComponent } from "@/components/order-table";

export default function VisualizarPedidos() {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-xl font-semibold">Ultimos Pedidos - 3° Milenio</h1>

      <div className="pt-10">
        <OrderTableComponent />
      </div>
    </div>
  );
}
