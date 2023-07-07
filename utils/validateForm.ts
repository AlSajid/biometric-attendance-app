import { toast } from "react-hot-toast";

interface InputField {
  label: string;
  input: React.RefObject<HTMLInputElement | HTMLSelectElement>;
}

export default function validateForm(fields: InputField[]) {
  for (let i = 0; i < fields.length; i++) {
    if (fields[i].input?.current?.value === "") {
      toast.error(fields[i]?.label + " is required");
      fields[i].input?.current?.focus();
      return true;
    }
  }
}
