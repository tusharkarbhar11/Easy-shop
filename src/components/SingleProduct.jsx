
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import { useCart } from "../context/CartContext";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        setProduct(null);

        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );

        setProduct(response.data);
      } catch (err) {
        setError("Unable to load product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  };

  if (loading) {
    return <Loader className="p-10" />;
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#222222] px-5 py-16 text-center text-white">
        <h2 className="text-2xl font-bold">
          Product Not Found
        </h2>

        <p className="mt-3 text-gray-400">
          {error || "This product does not exist."}
        </p>

        <button
          onClick={() => navigate("/products")}
          className="mt-6 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Back to Products
        </button>

        {error && (
          <button
            onClick={() => navigate(0)}
            className="ml-3 mt-6 rounded-lg border border-gray-500 px-6 py-3 text-white transition hover:bg-gray-700"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#222222] px-6 py-10 text-white max-[600px]:px-3">
      {/* Back Button */}
      <button
        onClick={() => navigate("/products")}
        className="mb-8 rounded-lg border border-gray-600 px-4 py-2 text-gray-300 transition hover:border-orange-500 hover:text-orange-400"
      >
        ← Back to Products
      </button>

      {/* Product Details */}
      <div className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-10 rounded-xl bg-gray-800 p-8 shadow-lg max-[700px]:grid-cols-1 max-[700px]:gap-6 max-[700px]:p-4">
        {/* Product Image */}
        <div className="flex items-center justify-center rounded-xl bg-white p-6">
          <img
            src={product.image}
            alt={product.title}
            className="h-96 w-full object-contain max-[600px]:h-64"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col">
          <p className="mb-3 w-fit rounded-full bg-gray-700 px-4 py-2 text-sm capitalize text-orange-400">
            {product.category}
          </p>

          <h1 className="text-3xl font-bold leading-snug max-[600px]:text-2xl">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm">
              ⭐ {product.rating?.rate ?? "N/A"}
            </span>

            <span className="text-sm text-gray-400">
              {product.rating?.count ?? 0} reviews
            </span>
          </div>

          {/* Price */}
          <p className="mt-6 text-3xl font-bold text-orange-400">
            ${Number(product.price).toFixed(2)}
          </p>

          {/* Description */}
          <div className="mt-6">
            <h2 className="mb-2 text-lg font-semibold">
              Product Description
            </h2>

            <p className="leading-7 text-gray-300">
              {product.description}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={handleAddToCart}
              className={`rounded-lg px-6 py-3 font-semibold text-white transition ${
                added
                  ? "bg-green-600"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {added ? "✓ Added to Cart" : "+ Add to Cart"}
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="rounded-lg border border-gray-500 px-6 py-3 font-semibold text-white transition hover:bg-gray-700"
            >
              Go to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
