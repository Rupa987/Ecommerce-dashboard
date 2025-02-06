import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <button onClick={() => navigate("/")} className="mb-4 text-blue-500">
        Go Back
      </button>

      {product && (
        <div className="flex flex-col sm:flex-row gap-8">
          <img
            src={product.image}
            alt={product.title}
            className="w-80 h-80 object-cover"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-semibold">{product.title}</h2>
            <p className="text-xl text-gray-700 mt-2">${product.price}</p>
            <div className="mt-4">
              <h3 className="font-medium text-lg">Description</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>
            <div className="mt-4">
              <h3 className="font-medium text-lg">Rating</h3>
              <p className="text-gray-700 mt-2">
                {product.rating.rate} ({product.rating.count} reviews)
              </p>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
