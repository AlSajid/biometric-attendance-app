export default function Input({ label, inputRef, ...rest }: { label: string; inputRef: React.RefObject<HTMLInputElement>; [x: string]: any }) {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input ref={inputRef} {...rest} />
    </div>
  );
}
