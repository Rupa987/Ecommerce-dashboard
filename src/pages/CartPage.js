import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={removeFromCart}
            onQuantityChange={updateQuantity}
          />
        ))}
      </div>
      <CartSummary totalPrice={totalPrice} />
    </div>
  );
};

export default CartPage;
