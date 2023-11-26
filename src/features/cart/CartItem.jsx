import { useSelector } from "react-redux";
import DeleteItemButton from "../../components/DeleteItemButton";
import UpdateCartItemQuantity from "../../components/UpdateCartItemQuantity";
import { formatCurrency } from "../../utils/helpers";
import { getQuantityById } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const itemQuantityInCart = useSelector(getQuantityById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateCartItemQuantity
          pizzaId={pizzaId}
          itemQuantityInCart={itemQuantityInCart}
        />
        <DeleteItemButton pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
