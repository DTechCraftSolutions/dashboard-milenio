import { CreateBannerComponent } from "@/components/register-banner";

export default function CriarNovosBanners() {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-xl font-semibold">Adicionar Banners - 3° Milenio</h1>

      <div className="pt-10">
        <CreateBannerComponent />
      </div>
    </div>
  );
}
