import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3 pr-3 flex justify-between items-center text-sm">
      {/* <div> */}
      <p>
        <span className="font-bold">{quantity}&times;</span> {name}
      </p>
      <p className="font-bold">{formatCurrency(totalPrice)}</p>
      {/* </div> */}
    </li>
  );
}

export default OrderItem;
