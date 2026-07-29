import Button from "../components/Button";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-96 bg-white p-8 rounded-xl shadow-lg">
        <Button text="Login" />
      </div>
    </div>
  );
}

export default Login;