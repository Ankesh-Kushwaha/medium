interface InputLabelType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputLabel({ type, label, placeholder, onChange }: InputLabelType) {
  return (
    <div className="flex flex-col mb-4 ">
      <label className="text-lg   mb-2  text-gray-800 font-bold">{label}</label>
      <input
        type={type ||"text"}
        placeholder={placeholder}
        onChange={onChange}
        className="border border-gray-300 rounded-md p-2 w-3xs"
      />
    </div>
  );
}

export default InputLabel;