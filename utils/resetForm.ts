export default function resetForm(fields: React.RefObject<HTMLInputElement>[] | any) {
  for (let i = 0; i < fields.length; i++) {
    fields[i].current.value = "";
  }
  return;
}
