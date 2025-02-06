const CartSummary = ({ totalPrice }) => {
  const handleCheckout = () => {
    alert("Checkout successful! (Mocked Action) 🎉");
    console.log("Redirecting to payment... (Mocked Action)");
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h3 className="text-xl font-semibold">Cart Summary</h3>
      <p className="text-lg mt-2">Total: ${totalPrice}</p>
      <button
        onClick={handleCheckout}
        className="bg-blue-500 text-white p-2 rounded-md mt-4 w-full"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;
