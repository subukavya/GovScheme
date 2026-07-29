type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

function Button({
  text,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
        w-full
        bg-green-700
        hover:bg-green-800
        text-white
        font-semibold
        py-3
        rounded-lg
        transition
        duration-300
        disabled:bg-gray-400
        disabled:cursor-not-allowed
      "
    >
      {text}
    </button>
  );
}

export default Button;