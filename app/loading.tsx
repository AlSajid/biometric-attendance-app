import Loader from "@/components/Loader";

export default function Loading() {
  return (
    <div className="my-3 h-96 flex justify-center items-center">
      <Loader msg="Rendering" />
    </div>
  );
}