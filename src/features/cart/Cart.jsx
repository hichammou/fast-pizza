import LinkButton from "../../components/LinkButton";
import Button from "../../components/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const cart = useSelector((state) => state.cart.cart);
  function handleClearCart() {
    dispatch(clearCart());
  }
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="divide-y divide-stone-200 border-b mt-3">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new">Order pizzas</Button>
        <Button variant="secondary" onClick={handleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
