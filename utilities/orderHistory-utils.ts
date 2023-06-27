export const getTotalQuantityOfSingleOrder = (orderArray: any) => {
  let totalQuantity = 0;
  orderArray.map((res: any) => {
    const itemsLength: number =
      res.message.responses[0].message.order.items.length;
    totalQuantity += itemsLength;
  });
  return totalQuantity;
};

export const getTotalPriceOfSingleOrder = (orderArray: any) => {
  let totalPrice = 0;
  orderArray.map((res: any) => {
    const price: number = parseFloat(
      res.message.responses[0].message.order.payment.params.amount
    );
    totalPrice += price;
  });
  return totalPrice;
};
