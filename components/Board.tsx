import { Metadata } from "next";
import Head from "next/head";

interface BoardProps {
  children: React.ReactNode;
  title: string;
  actions?: React.ReactNode;
}

export default function Board({ children, title, actions }: BoardProps) {
  return (
    <>
      <title>{title}</title>
      <div className="flex flex-col mx-3 h-full ">
        {/* header */}
        <div className="h-16 grid grid-cols-12">
          <div className="col-span-6 flex items-center">
            <h1 className="text-3xl font-bold text-teal-700 m-3">{title}</h1>
          </div>
          <div className="col-span-6 flex items-center justify-end gap-1">{actions}</div>
        </div>

        {/* board */}
        <div className="rounded-lg grow mb-3 overflow-y-auto bg-slate-100 border shadow-lg">{children}</div>
      </div>
    </>
  );
}
