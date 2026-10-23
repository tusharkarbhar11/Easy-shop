
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ registeredUser, setRegisteredUser }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  
const handleSubmit = (e) => {
  e.preventDefault();
  setError("");

  if (!name.trim() || !email.trim() || !password || !confirmPassword) {
    setError("Please fill in all fields.");
    return;
  }

  if (password.length < 6) {
    setError("Password must contain at least 6 characters.");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  if (
    registeredUser &&
    registeredUser.email === email.trim().toLowerCase()
  ) {
    setError("This email is already registered.");
    return;
  }

  const newUser = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
  };

  console.log("Registering user:", {
    name: newUser.name,
    email: newUser.email,
  });

  setRegisteredUser(newUser);

  navigate("/login");
};


  return (
    <div className="flex min-h-screen items-center justify-center bg-[#222222] px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-2xl border border-gray-700 bg-gray-800 p-8 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Create Account
        </h1>

        <p className="mb-8 text-center text-gray-400">
          Join EasyShop and start shopping.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-600 bg-gray-700 p-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-600 bg-gray-700 p-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              minLength={6}
              className="w-full rounded-lg border border-gray-600 bg-gray-700 p-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full rounded-lg border border-gray-600 bg-gray-700 p-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-orange-500 py-3 font-semibold hover:bg-orange-600"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-orange-400 hover:text-orange-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
