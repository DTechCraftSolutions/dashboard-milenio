import { LoginComponent } from "@/components/login-component";
import Image from "next/image";

export default function Login() {
  return (
    <div className="w-full min-h-screen md:flex">
      <div className="hidden md:flex md:w-1/2 h-screen bg-[#232A60] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#232A60] to-[#1A1F4A]" />
        <div className="relative z-10 flex flex-col justify-center items-center h-full w-full p-12">
          <div className="max-w-md">
            <Image 
              src="/assets/logo.png" 
              alt="logo" 
              width={180} 
              height={180}
              className="mb-8" 
            />
            <h1 className="text-4xl font-bold text-white mb-4">
              Bem-vindo ao Dashboard
            </h1>
            <p className="text-lg text-gray-300">
              Gerencie seus produtos, vendas e estoque de forma simples e eficiente.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center justify-center gap-4 text-gray-400 text-sm">
              <span>© 2024 3° Milênio</span>
              <span>•</span>
              <span>Termos de Uso</span>
              <span>•</span>
              <span>Política de Privacidade</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="md:hidden mb-8 text-center">
            <Image 
              src="/assets/logo.png" 
              alt="logo" 
              width={120} 
              height={120}
              className="mx-auto" 
            />
          </div>
          <LoginComponent />
        </div>
      </div>
    </div>
  );
}
