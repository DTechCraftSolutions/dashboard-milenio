import { FilterProductsComponent } from "@/components/filter-products";
import { TableProductsComponent } from "@/components/table-products";

export default function Produtos() {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-semibold">Produtos 3° Milenio</h1>
      <div className="pt-5 w-full">
        <FilterProductsComponent />
      </div>
      <div className="pt-10">
        <TableProductsComponent />
      </div>
    </div>
  );
}
