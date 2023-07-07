import { toast } from "react-hot-toast";
import errorHandler from "../errorHandler";

export default async function getReqHandler(path: string) {
  try {
    const res = await fetch(`/api/${path}`);
    const result = await res.json();

    if (result.error) {
      return toast.error(result.error);
    } else {
      return result;
    }
  } catch (error) {
    toast.error(errorHandler(error));
  }
}
