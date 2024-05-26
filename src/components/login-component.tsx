"use client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export function LoginComponent() {
  const router = useRouter();
  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push("/");
  }
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <form onSubmit={(e) => handleLogin(e)} className="flex flex-col gap-10">
        <input
          className="w-[20rem] md:w-[28rem] lg:w-[30rem] xl:w-[40rem] bg-zinc-300 rounded-md p-5 focus:outline-none"
          placeholder="Email"
          type="text"
        />
        <input
          className="w-[20rem] md:w-[28rem] lg:w-[30rem] xl:w-[40rem] bg-zinc-300 rounded-md p-5 focus:outline-none"
          placeholder="Senha"
          type="password"
        />
        <button
          type="submit"
          className="bg-[#E72F2B] rounded-md p-5 text-white hover:bg-[#E72F2B]/70
          transition-all duration-500"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
