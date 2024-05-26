"use client";
import { Input } from "antd";
import { FormEvent, useState } from "react";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
} from "@ant-design/icons";

export function LoginComponent() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    window.location.href = "/";
  }
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <form
        onSubmit={(e) => handleLogin(e)}
        className="flex flex-col gap-10 w-full justify-center items-center"
      >
        <Input
          className="w-2/3 p-4 text-lg"
          placeholder="Digite seu email"
          suffix={<MailOutlined className="text-[18px] text-red-500 " />}
        />

        <Input.Password
          className="w-2/3 p-4 text-lg"
          placeholder="Digite sua senha"
          iconRender={(visible) =>
            visible ? (
              <EyeTwoTone className="text-[20px] " />
            ) : (
              <EyeInvisibleOutlined className="text-[20px] " />
            )
          }
        />
        <button
          type="submit"
          className="w-2/3 bg-[#E72F2B] rounded-md p-5 text-white hover:bg-[#E72F2B]/70
          transition-all duration-500"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
