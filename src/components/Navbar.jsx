
import { useCart } from "../context/CartContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";


function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  
  const { cartCount } = useCart();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `transition hover:text-orange-400 ${
      isActive ? "text-orange-400" : "text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-[#222] px-6 py-4 shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">

        {/* Logo */}

        <Link to="/" className="flex items-center gap-3">

          <img
            src="https://png.pngtree.com/png-vector/20220930/ourmid/pngtree-shopping-logo-design-for-online-store-website-png-image_6239056.png"
            alt="EasyShop Logo"
            className="h-12 w-16 object-contain"
          />

        <h2 className="text-xl font-bold">
          Easy<span className="text-orange-500">Shop</span>
        </h2>

        </Link>

        {/* Navigation Links */}

        <div className="flex items-center gap-5">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={linkClass}>
            Products
          </NavLink>

           {/* Cart Icon and Count  */}

          <NavLink
            to="/cart"
            aria-label={`Shopping cart, ${cartCount} items`}
            // className={linkClass}
            className={({ isActive }) =>
              `relative inline-flex items-center transition hover:text-orange-400 ${
                isActive ? "text-orange-400" : "text-white"
              }`
            }
          >
            <ShoppingCart size={25} strokeWidth={2} />

            <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-xs font-bold text-white">
              {cartCount}
            </span>
          </NavLink>
        </div>

        {/* Authentication Buttons */}

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-gray-200">
                Hi, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-lg border border-orange-500 px-4 py-2 text-orange-400 transition hover:bg-orange-500 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg border border-orange-500 px-4 py-2 text-orange-400 transition hover:bg-orange-500 hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white transition hover:bg-orange-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
