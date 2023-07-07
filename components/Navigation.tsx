"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import { Menu, menu } from "@/public/options";

export default function Navigation({ logo }: { logo: StaticImageData }) {
  const pathname: string = usePathname();

  return (
    <nav className="w-64 h-screen flex flex-col ">
      {/* logo */}
      <div className="p-7 flex justify-center items-center h-16">
        {logo && <Image src={logo} alt="logo" loading="eager" priority={true} />}
      </div>

      {/* menu */}
      <div className="theme-gradient h-full rounded-tr-lg">
        {menu.map((item: Menu, index: number) => (
          <div key={index} className="h-16 hover:h-64 overflow-hidden smooth-transition p-3">
            <button
              type="button"
              className={
                (pathname.slice(0, pathname.indexOf("/", 1)) === item.path
                  ? " bg-teal-100 text-teal-900 hover:bg-teal-100"
                  : "bg-teal-700") + " w-56 h-12 p-3 font-semibold rounded-lg flex items-center smooth-transition"
              }>
              <span className="text-xl mr-3">{item.icon}</span>
              <span className="text-xl">{item.option}</span>
            </button>

            <div className="bg-teal-500 overflow-y-scroll h-44">
              {item.sub.map((option: { name: string; path: string }, index: number) => (
                <Link key={index} href={item.path + option.path}>
                  <button
                    type="button"
                    className={
                      (pathname.slice(pathname.indexOf("/", 1)) === option.path ? " bg-teal-900 font-light" : "bg-teal-600 font-thin") +
                      " hover:bg-teal-700 w-52 p-3 rounded text-lg text-left"
                    }>
                    {option.name}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
