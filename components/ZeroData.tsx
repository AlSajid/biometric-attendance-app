// import { FaMartiniGlassEmpty } from "react-icons/fa";

export default function ZeroData({ entity }: any) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* <FaMartiniGlassEmpty /> */}
      <h1 className="text-2xl font-semibold">No {entity} Found</h1>
    </div>
  );
}
