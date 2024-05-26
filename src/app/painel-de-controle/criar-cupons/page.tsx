import { CreateCouponComponent } from "@/components/register-coupon";

export default function CriarCupons() {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-xl font-semibold">
        Adicionar Cupom de Desconto - 3° Milenio
      </h1>

      <div className="pt-10">
        <CreateCouponComponent />
      </div>
    </div>
  );
}
