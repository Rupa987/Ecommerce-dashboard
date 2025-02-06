import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOption === "priceLow") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHigh") {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      updatedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    setFilteredProducts(updatedProducts);
  }, [searchTerm, sortOption, products]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or category..."
          className="flex-1 p-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="p-2 border rounded-lg w-48"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover mb-2"
              />
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-700">${product.price}</p>
              <p className="text-yellow-500">⭐ {product.rating.rate}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
