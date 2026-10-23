
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const subtotal =
    cartTotal;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    setOrderNumber(
      `ES${Date.now().toString().slice(-8)}`
    );

    setShowConfirmation(true);
  };

  const handleContinueShopping = () => {
    setShowConfirmation(false);
    navigate("/products");
  };

  return (
    <div className="min-h-screen bg-[#222222] p-6 text-white max-[600px]:p-3">
      <h1 className="mb-8 text-3xl font-bold">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="py-16 text-center">
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="mt-3 text-gray-400">
            Add some products before checking out.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-6 rounded-lg bg-orange-500 px-6 py-3 font-semibold hover:bg-orange-600"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-xl bg-gray-800 p-4 sm:flex-row sm:items-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-24 w-24 self-center rounded-lg bg-white p-2 object-contain sm:self-auto"
                />

                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold">{item.title}</h2>

                  <p className="mt-2 text-orange-400">
                    ${Number(item.price).toFixed(2)}
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="rounded bg-gray-700 px-3 py-1 disabled:opacity-40"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="rounded bg-gray-700 px-3 py-1"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="self-start text-sm text-red-400 hover:text-red-300 sm:self-center"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="rounded-xl bg-gray-800 p-6">
            <h2 className="mb-5 text-xl font-bold">Order Summary</h2>

            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="mt-3 flex justify-between text-gray-300">
              <span>Shipping</span>
              <span className="text-green-400">Free</span>
            </div>

            <div className="my-5 border-t border-gray-600" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-orange-400">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-6 w-full rounded-lg bg-orange-500 py-3 font-semibold transition hover:bg-orange-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {showConfirmation && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-confirmed-title"
            className="w-full max-w-md rounded-2xl border border-gray-700 bg-gray-800 p-8 text-center shadow-2xl"
          >
            {/* Success Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/15">
              <svg
                className="h-12 w-12 text-green-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </div>

            <h2
              id="order-confirmed-title"
              className="mt-5 text-2xl font-bold text-white"
            >
              Order Confirmed!
            </h2>

            <p className="mt-3 leading-6 text-gray-300">
              Thank you for shopping with EasyShop. Your demo order has been
              placed successfully.
            </p>

            <div className="mt-5 rounded-lg bg-gray-700 p-4">
              <p className="text-sm text-gray-400">Order Number</p>
              <p className="mt-1 font-semibold text-orange-400">
                #{orderNumber}
              </p>

              <p className="mt-3 text-sm text-gray-400">Order Total</p>
              <p className="mt-1 text-xl font-bold text-white">
                ${subtotal.toFixed(2)}
              </p>
            </div>

            <button
              onClick={handleContinueShopping}
              className="mt-6 w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Continue Shopping
            </button>

            <button
              onClick={() => setShowConfirmation(false)}
              className="mt-3 w-full rounded-lg border border-gray-600 py-3 text-gray-300 transition hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
