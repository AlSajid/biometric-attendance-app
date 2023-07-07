import logo from "@/public/logo.svg";
import Navigation from "@/components/Navigation";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], fallback: ["arial"] });

export const metadata = {
  title: "Attendance Management App",
  description: "Employee Attendance Management App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        {/* application interface */}
        <main className="h-screen lg:flex hidden">
          <Navigation logo={logo} />
          <div className="w-full h-full">{children}</div>
        </main>

        {/* small screen warning */}
        <div className="flex flex-col justify-center items-center bg-black text-white h-screen lg:hidden">
          <h1 className="text-5xl font-bold">Attention ⚠️</h1>
          <p className="text-gray-600 text-center my-7 text-xl">
            <span>This application is not supported on small screen devices.</span>
            <br />
            <span>Please use it in maximized window mode on your PC.</span>
          </p>
        </div>

        <Toaster />
      </body>
    </html>
  );
}
