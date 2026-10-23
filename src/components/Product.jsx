
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import { useCart } from "../context/CartContext";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  // Fetch products and categories from FakeStore API
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [productResponse, categoryResponse] = await Promise.all([
        axios.get("https://fakestoreapi.com/products"),
        axios.get("https://fakestoreapi.com/products/categories"),
      ]);
+
      setProducts(productResponse.data);
      setCategories(categoryResponse.data);
    } catch {
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Search, category and price filtering
  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || item.category === category;

    const price = Number(item.price);

    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "under25" && price < 25) ||
      (priceRange === "25-50" && price >= 25 && price <= 50) ||
      (priceRange === "50-100" && price > 50 && price <= 100) ||
      (priceRange === "above100" && price > 100);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Reset all filters
  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setPriceRange("all");
  };

  // Loading state
  if (loading) {
    return <Loader className="p-10" />;
  }



  return (
    <div className="min-h-screen bg-[#222222] p-6 text-white max-[600px]:p-3">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <p className="mt-2 text-gray-400">
          Find your favourite products at great prices.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <input
          type="search"
          placeholder="Search products...🔎"
          aria-label="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-600 bg-gray-700 p-3 text-white outline-none placeholder:text-gray-400 focus:border-orange-500"
        />

        {/* Category Filter */}

        <select
          aria-label="Filter by category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-gray-600 bg-gray-700 p-3 text-white outline-none focus:border-orange-500"
        >
          <option value="all">All Categories</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Price Filter */}
        <select
          aria-label="Filter by price range"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full rounded-lg border border-gray-600 bg-gray-700 p-3 text-white outline-none focus:border-orange-500"
        >
          <option value="all">All Prices</option>
          <option value="under25">Under  ₹25</option>
          <option value=" ₹25- 50"> ₹25 -  50</option>
          <option value=" ₹50-100"> ₹50 - 100</option>
          <option value="above  ₹100">Above 100</option>
        </select>
      </div>

      {/* Result Count and Clear Filters */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-400">
          {filteredProducts.length} products found
        </p>

        <button
          type="button"
          onClick={clearFilters}
          className="rounded-lg border border-orange-500 px-4 py-2 text-sm font-semibold text-orange-400 transition hover:bg-orange-500 hover:text-white"
        >
          Clear Filters
        </button>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-5 gap-4 max-[1200px]:grid-cols-4 max-[900px]:grid-cols-3 max-[600px]:grid-cols-2 max-[300px]:grid-cols-1">
          {filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              addToCart={addToCart}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <h2 className="text-xl font-semibold">No products found</h2>
          <p className="mt-2 text-gray-400">
            Try changing your search or filters.
          </p>

          <button
            onClick={clearFilters}
            className="mt-4 rounded-lg bg-orange-500 px-5 py-2 font-semibold text-white transition hover:bg-orange-600"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

// Reusable Product Card
const ProductCard = ({ item, addToCart }) => {
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const openDetails = () => {
    navigate(`/products/${item.id}`);
  };

  const handleAddToCart = () => {
    addToCart(item);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1000);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg bg-gray-700 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20">
      {/* Product Image */}
      <button
        type="button"
        onClick={openDetails}
        aria-label={`View ${item.title}`}
        className="bg-white p-4"
      >
        <img
          className="aspect-square w-full object-contain transition duration-300 group-hover:scale-95"
          src={item.image}
          alt={item.title}
          loading="lazy"
        />
      </button>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-4 max-[600px]:p-3">
        <button
          type="button"
          onClick={openDetails}
          className="line-clamp-2 min-h-14 text-left text-lg font-medium text-white transition hover:text-blue-400 sm:text-xl"
        >
          {item.title}
        </button>

        {/* Rating and Reviews */}
        <div className="my-3 flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1 rounded-lg bg-green-600 px-3 py-1 text-xs text-white">
            ⭐ {item.rating?.rate ?? "N/A"}
          </span>

          <span className="text-sm text-gray-300">
            {item.rating?.count ?? 0} reviews
          </span>
        </div>

        {/* Price */}
        <p className="mb-4 text-lg font-bold text-white/90">
           ₹{Number(item.price).toFixed(2)}
        </p>

        {/* Action Buttons */}
        <div className="mt-auto flex flex-col gap-2">
          <button
            type="button"
            onClick={openDetails}
            className="w-full rounded-lg border border-gray-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-gray-600"
          >
            View Details
          </button>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full rounded-lg px-3 py-2 text-sm font-semibold text-white transition ${
              added
                ? "bg-green-600"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {added ? "✓ Added to Cart" : "+ Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
