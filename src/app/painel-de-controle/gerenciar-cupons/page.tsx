import { TableCouponComponent } from "@/components/table-coupon";

export default function GerenciarCupons() {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-xl font-semibold">
        Meus Cupons de Desconto - 3° Milenio
      </h1>

      <div className="pt-10">
        <TableCouponComponent />
      </div>
    </div>
  );
}
