import cartIcon from "/images/icon-add-to-cart.svg";
import plusIcon from "/images/icon-increment-quantity.svg";
import minusIcon from "/images/icon-decrement-quantity.svg";

function ProductCard({ product, cart, addToCart, decreaseQuantity }) {
  const cartItem = cart.find((item) => item.name === product.name);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="product-card">
      <div className={`image-wrapper ${quantity > 0 ? "active" : ""}`}>
        <img src={product.image.desktop} alt={product.name} />

        {quantity === 0 ? (
          <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
            <img src={cartIcon} alt="cart" />
            Add to Cart
          </button>
        ) : (
          <div className="quantity-btn">
            <button onClick={() => decreaseQuantity(product)}>
              <img src={minusIcon} alt="decrease" />
            </button>
            <span>{quantity}</span>
            <button onClick={() => addToCart(product)}>
              <img src={plusIcon} alt="increase" />
            </button>
          </div>
        )}
      </div>

      <p className="product-category">{product.category}</p>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price.toFixed(2)}</p>
    </div>
  );
}

export default ProductCard;