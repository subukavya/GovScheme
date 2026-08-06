import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  label: string;
  placeholder: string;
}

function PasswordInput({
  label,
  placeholder,
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-6">
      <label className="block mb-2 font-medium">
        {label}
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="neo-input w-full pr-12"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-4"
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;