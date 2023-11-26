import { useDispatch } from "react-redux";
import Button from "./Button";
import { deleteItem } from "../features/cart/cartSlice";

function DeleteItem({ pizzaId }) {
  const dispatchCart = useDispatch();
  function handleDeleteItemFromCart() {
    dispatchCart(deleteItem(pizzaId));
  }
  return (
    <Button variant="small" onClick={handleDeleteItemFromCart}>
      delete
    </Button>
  );
}

export default DeleteItem;
