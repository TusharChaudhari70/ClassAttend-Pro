import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userAPI } from "./apiService";

function Login() {
  const navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.role) {
      if (user.role === "admin") {
        navigate("/admin-dashboard", { replace: true });
      } else if (user.role === "faculty") {
        navigate("/faculty-dashboard", { replace: true });
      }
    }
  }, []);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setLoginRequest((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await userAPI.loginUser(loginRequest);
      const user = response.data;

      if (user && user.username) {
        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "admin") {
          navigate("/admin-dashboard", { replace: true });
        } else if (user.role === "faculty") {
          navigate("/faculty-dashboard", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
      <form
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col gap-6"
        onSubmit={submitHandler}
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={loginRequest.username}
          onChange={inputHandler}
          className="border rounded px-3 py-2"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginRequest.password}
          onChange={inputHandler}
          className="border rounded px-3 py-2"
        />

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;