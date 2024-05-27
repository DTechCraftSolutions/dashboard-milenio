"use client";
import { Button, Input, Space, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
const props: UploadProps = {
  onChange({ file, fileList }) {
    if (file.status !== "uploading") {
      console.log(file, fileList);
    }
  },
};
export function CreateBannerComponent() {
  return (
    <div className="flex flex-col w-full">
      <form className="border w-11/12 flex flex-col gap-10 p-5 h-full rounded-lg">
        <div className="flex gap-5">
          <Input className="p-2" placeholder="Nome do banner" type="text" />

          <Input
            className="p-2 "
            placeholder="dscrição do banner"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2 border p-5 rounded-md bg-zinc-100">
          <label> Adicione uma imagem: </label>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </div>
        <div className="flex justify-end w-full">
          <button
            className="bg-[#E72F2B] text-white font-bold py-2 px-4 rounded
        hover:bg-[#E72F2B]/70 transition-all duration-500 w-1/6 "
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
