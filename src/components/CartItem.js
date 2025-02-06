const CartItem = ({ item, onRemove, onQuantityChange }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover"
      />
      <div className="flex flex-col">
        <span className="text-lg font-semibold">{item.name}</span>
        <span className="text-gray-500">${item.price}</span>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value))}
          className="w-16 border p-1"
        />
        <button
          onClick={() => onRemove(item.id)}
          className="bg-red-500 text-white p-2 rounded-md"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
