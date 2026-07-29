type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
};

function Input({
  label,
  type = "text",
  placeholder,
}: InputProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
      />
    </div>
  );
}

export default Input;