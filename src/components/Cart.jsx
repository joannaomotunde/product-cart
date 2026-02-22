const emptyCartIcon = "/images/illustration-empty-cart.svg";
const carbonNeutralIcon = "/images/icon-carbon-neutral.svg";
const removeIcon = "/images/icon-remove-item.svg";

function Cart({ cart, onConfirm, removeItem, clearCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-box">
      <h2>Your Cart ({totalItems})</h2>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <img src={emptyCartIcon} alt="empty cart" />
          <p>Your added items will appear here</p>
        </div>
      ) : (
        <>
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>
                <span className="cart-item-name">{item.name}</span>
                <div className="cart-item-details">
                  <span className="cart-item-quantity">{item.quantity}x</span>
                  <span className="cart-item-price">@ ${item.price.toFixed(2)}</span>
                  <span className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</span>
                  <button className="remove-item-btn" onClick={() => removeItem(item.name)}>
                    <img src={removeIcon} alt="remove" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <p>Order Total</p>
            <p>${total.toFixed(2)}</p>
          </div>

          <div className="carbon-neutral">
            <img src={carbonNeutralIcon} alt="carbon neutral" />
            <p>This is a <strong>carbon-neutral</strong> delivery</p>
          </div>

          <button className="confirm-btn" onClick={onConfirm}>
            Confirm Order
          </button>

          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;