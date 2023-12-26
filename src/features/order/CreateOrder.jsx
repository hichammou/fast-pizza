import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import { clearCart, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const {
    username,
    status: addressStatus,
    address,
    error,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";

  const [withPriority, setWithPriority] = useState(false);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;

  // to check if there is any errors whene doing fetch request
  const formErrors = useActionData();

  // to check if the request is still loading
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8 ">
        Ready to order? Let&apos;s go!
      </h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST" className="mt-5">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="form-input grow"
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              type="tel"
              className="form-input w-full"
              name="phone"
              required
            />
            {formErrors?.phone && (
              <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              disabled={isLoadingAddress}
              required
              className="form-input w-full"
              defaultValue={address}
            />
            {addressStatus === "error" && (
              <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">
                {error}
              </p>
            )}
          </div>
          {address.length === 0 && (
            <span className="absolute right-[3px] top-[3px] sm:right-[5px] sm:top-[5px]">
              <Button
                disabled={isLoadingAddress}
                variant="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get my position
              </Button>
            </span>
          )}
        </div>

        <div className="flex gap-2 items-center">
          <input
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div className="mt-8">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing order..."
              : `Order now ${formatCurrency(totalCartPrice + priorityPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = "Invalid phone number";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  // do not overuse
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
