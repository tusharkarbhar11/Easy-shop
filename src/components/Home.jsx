
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { addToCart } = useCart();

  // Fetch featured products using Axios
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products"
        );

        setProducts(response.data.slice(0, 4));
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const categories = [
    { name: "Electronics", icon: "💻" },
    { name: "Jewelry", icon: "💎" },
    { name: "Men's Clothing", icon: "👕" },
    { name: "Women's Clothing", icon: "👗" },
  ];

  return (
    <div className="min-h-screen bg-[#222222] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16 md:px-16 md:py-24 lg:px-20">
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-14 md:flex-row">
          <div className="max-w-2xl">
            

            <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Shop Everything
              <span className="block text-orange-500">
                You Love ...
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Discover electronics, fashion, jewelry, and everyday
              essentials. Find products you love without making
              shopping complicated.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="rounded-lg bg-orange-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-1 hover:bg-orange-600"
              >
                Shop Now →
              </Link>

              <a
                href="#featured"
                className="rounded-lg border border-gray-500 px-7 py-3.5 font-semibold transition hover:border-orange-500 hover:text-orange-400"
              >
                Explore Collection
              </a>
            </div>
          </div>

          <div className="flex w-full max-w-md justify-center">
            <div className="relative flex aspect-square w-full max-w-sm items-center justify-center rounded-full border border-white/10 bg-[#36445a] shadow-2xl shadow-black/30">
              <div className="absolute inset-5 rounded-full border border-dashed border-orange-400/30" />

              <div className="relative text-center">
                <div className="text-8xl">🛍️</div>

                <h2 className="mt-5 text-3xl font-bold">
                  Shop Smart
                </h2>

                <p className="mt-3 text-gray-300">
                  Quality • Style • Value
                </p>

                <div className="mt-5 inline-block rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold">
                  Find your favourites
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-16 lg:px-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-semibold uppercase tracking-widest text-orange-500">
              Find your style
            </p>

            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Shop by Category
            </h2>
          </div>

          <Link
            to="/products"
            className="font-semibold text-orange-400 hover:text-orange-300"
          >
            View All →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to="/products"
              className="group rounded-xl border border-gray-700 bg-[#36445a] p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/5 sm:p-7"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/10 text-3xl transition group-hover:bg-orange-500/20">
                {category.icon}
              </div>

              <h3 className="mt-5 font-bold sm:text-lg">
                {category.name}
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Explore collection →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section
        id="featured"
        className="mx-auto max-w-7xl px-6 py-12 md:px-16 lg:px-20"
      >
        <div>
          <p className="font-semibold uppercase tracking-widest text-orange-500">
            Handpicked for you
          </p>

          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            Featured Products
          </h2>

          <p className="mt-3 text-gray-400">
            Discover a few favourites from our collection.
          </p>
        </div>

        {!loading && !error && (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-gray-700 bg-[#36445a] transition duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-xl hover:shadow-black/20"
              >
                <Link
                  to={`/products/${product.id}`}
                  className="flex h-56 items-center justify-center bg-white p-6"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                  />
                </Link>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs capitalize text-gray-400">
                    {product.category}
                  </p>

                  <Link to={`/products/${product.id}`}>
                    <h3 className="mt-2 line-clamp-2 min-h-12 font-semibold leading-6 hover:text-orange-400">
                      {product.title}
                    </h3>
                  </Link>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-400">
                      ${product.price.toFixed(2)}
                    </span>

                    <span className="text-sm text-yellow-400">
                      ★ {product.rating?.rate ?? "N/A"}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="mt-5 w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600"
                  >
                    + Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="inline-block rounded-lg border border-gray-500 px-7 py-3 font-semibold transition hover:border-orange-500 hover:text-orange-400"
          >
            View All Products →
          </Link>
        </div>
      </section>

      <section className="px-6 py-14 md:px-16 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-semibold uppercase tracking-widest text-orange-500">
              The EasyShop difference
            </p>

            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Why Choose Us?
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: "🚚",
                title: "Fast Delivery",
                description:
                  "Enjoy a simple shopping experience from browsing to checkout.",
              },
              {
                icon: "⭐",
                title: "Quality Products",
                description:
                  "Explore a variety of products across different categories.",
              },
              {
                icon: "🔒",
                title: "Simple Shopping",
                description:
                  "Manage your selected products easily with your shopping cart.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-gray-700 bg-[#36445a] p-7 text-center transition duration-300 hover:-translate-y-1 hover:border-orange-500/50"
              >
                <div className="text-4xl">{item.icon}</div>

                <h3 className="mt-4 text-xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-12 md:px-16 lg:px-20">
        <div className="mx-auto max-w-7xl rounded-2xl border border-gray-700 bg-[#36445a] px-6 py-12 text-center sm:px-12">
          <p className="font-semibold uppercase tracking-widest text-orange-400">
            Your next favourite awaits
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Ready to Start Shopping?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-300">
            Explore our collection and find something you love.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-block rounded-lg bg-orange-500 px-8 py-3 font-bold transition hover:bg-orange-600"
          >
            Explore Products →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-[#1b1b1b] px-6 py-8 text-center">
        <h2 className="text-xl font-bold">
          Easy<span className="text-orange-500">Shop</span>
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Your everyday shopping destination.
        </p>

        <p className="mt-5 text-xs text-gray-500">
          © This website devlop by Tushar karbhar.
        </p>
      </footer>
    </div>
  );
}

export default Home;
