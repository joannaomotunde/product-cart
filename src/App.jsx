import { useState, useEffect } from "react";
import products from "./data.json";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  const [cart, setCart] = useState(() => {
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
});

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === product.name);
      if (existingItem) {
        return prevCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const decreaseQuantity = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === product.name);
      if (!existingItem) return prevCart;
      if (existingItem.quantity === 1) {
        return prevCart.filter((item) => item.name !== product.name);
      }
      return prevCart.map((item) =>
        item.name === product.name
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const handleConfirmOrder = () => {
    if (cart.length === 0) return;
    setIsModalOpen(true);
  };

  const startNewOrder = () => {
    setCart([]);
    localStorage.removeItem("cart");
    setIsModalOpen(false);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };
  const removeItem = (name) => {
  setCart(prevCart => prevCart.filter(item => item.name !== name));
};

  return (
    <div className="container">
      <h1>Desserts</h1>

      <div className="main-content">
        <div className="products-container">
          {products.map((product) => (
            <ProductCard
              key={product.name}
              product={product}
              cart={cart}
              addToCart={addToCart}
              decreaseQuantity={decreaseQuantity}
              
            />
          ))}
        </div>
         <Cart
          cart={cart}
          onConfirm={handleConfirmOrder}
          clearCart={clearCart}
          removeItem={removeItem}
        />
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <img
              src="/src/assets/images/icon-order-confirmed.svg"
              alt="confirmed"
              className="modal-check"
            />
            <h2>Order Confirmed</h2>
            <p className="modal-subtitle">We hope you enjoy your food!</p>

            <div className="modal-items">
              {cart.map((item, index) => (
                <div key={index} className="modal-item">
                  <img
                    src={item.image.thumbnail}
                    alt={item.name}
                    className="modal-thumb"
                  />
                  <div className="modal-item-info">
                    <p className="modal-item-name">{item.name}</p>
                    <p className="modal-item-meta">
                      <span className="modal-qty">{item.quantity}x</span>
                      <span className="modal-price">@ ${item.price.toFixed(2)}</span>
                    </p>
                  </div>
                  <p className="modal-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="modal-total">
                <p>Order Total</p>
                <p>
                  ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                </p>
              </div>
            </div>

            <button className="modal-btn" onClick={startNewOrder}>
              Start New Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;