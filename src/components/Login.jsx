
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ registeredUser, setUser }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Check whether an account exists
    if (!registeredUser) {
      setError("No registered account found. Please sign up first.");
      return;
    }

    // Check email
    const emailMatches =
      email.trim().toLowerCase() ===
      registeredUser.email.toLowerCase();

    // Check password
    const passwordMatches =
      password === registeredUser.password;

    if (!emailMatches || !passwordMatches) {
      setError("Invalid email or password.");
      return;
    }

    // Login successful
    setUser({
      name: registeredUser.name,
      email: registeredUser.email,
    });

    // Navigate to Home
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#222] px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl bg-gray-800 p-8 shadow-xl"
      >
        <h1 className="mb-2 text-center text-3xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="mb-6 text-center text-gray-400">
          Login to your EasyShop account
        </p>

        {error && (
          <p className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
            {error} 
          </p>
        )}

        <label className="mb-2 block text-gray-200">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="mb-4 w-full rounded-lg border border-gray-600 bg-gray-700 p-3 text-white outline-none focus:border-orange-500"
          required
        />

        <label className="mb-2 block text-gray-200">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="mb-6 w-full rounded-lg border border-gray-600 bg-gray-700 p-3 text-white outline-none focus:border-orange-500"
          required
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Login
        </button>

        <p className="mt-5 text-center text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-orange-400 hover:text-orange-300"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
