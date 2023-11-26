import { useDispatch } from "react-redux";
import Button from "./Button";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from "../features/cart/cartSlice";

function UpdateCartItemQuantity({ pizzaId, itemQuantityInCart }) {
  const dispatch = useDispatch();
  return (
    <div className="space-x-2">
      <Button
        variant="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
      <span className="font-semibold text-sm">{itemQuantityInCart}</span>
      <Button
        variant="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
    </div>
  );
}

export default UpdateCartItemQuantity;
