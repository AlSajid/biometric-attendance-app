import { toast } from "react-hot-toast";
import errorHandler from "@/utils/errorHandler";

export default async function postReqHandler(path: string, data: any) {
  try {
    const res = await fetch(`/api/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (result.success === undefined && result.error === undefined) return result;

    if (result.error) {
      toast.error(result.error);
    } else if (result.success) {
      toast.success(result.success);
    }

    return res.status;
  } catch (error) {
    toast.error(errorHandler(error));
    return 500;
  }
}
