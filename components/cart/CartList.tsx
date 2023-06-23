import React from "react";
import { useSelector } from "react-redux";
import { ICartRootState, ICartProduct } from "../../lib/types/cart";
import { RetailItem } from "../../lib/types/products";
import CartItem from "./CartItem";

const CartList = () => {
  const cartItems = useSelector((state: ICartRootState) => state.cart.items);

  return (
    <div>
      <div className="w-full xl:max-w-[2100px] mx-auto">
        {cartItems.length
          ? cartItems.map((cartItem: RetailItem) => {
              return <CartItem key={cartItem.id} product={cartItem} />;
            })
          : null}
      </div>
    </div>
  );
};

export default CartList;
