import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import DeleteItemButton from "../../components/DeleteItemButton";

import { formatCurrency } from "../../utils/helpers";
import { addItem, getQuantityById } from "../cart/cartSlice";
import UpdateCartItemQuantity from "../../components/UpdateCartItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const cartDispatch = useDispatch();
  const itemQuantityInCart = useSelector(getQuantityById(id));

  const isInCart = itemQuantityInCart > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };
    cartDispatch(addItem(newItem));
  }

  return (
    <li className={`flex gap-4 py-2 ${soldOut && "solde-out"}`}>
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-col flex-1">
        <p>{name}</p>
        <p className="capitalize">{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm uppercase font-medium text-red-600">
              Sold out
            </p>
          )}

          {isInCart && (
            <div className="flex gap-4">
              <DeleteItemButton pizzaId={id} />
              <UpdateCartItemQuantity
                itemQuantityInCart={itemQuantityInCart}
                pizzaId={id}
              />
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button onClick={handleAddToCart} variant="small">
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
