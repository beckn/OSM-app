import { CartItemForRequest, ItemPerBpp } from "../lib/types/cart";

export const getCartItemsPerBpp = (cart: CartItemForRequest[]) => {
  const itemsPerBpp = {};

  cart.map((item: CartItemForRequest) => {
    const bppId = item.bpp_id;

    if (itemsPerBpp[bppId]) {
      itemsPerBpp[bppId].push(item);
    } else {
      itemsPerBpp[bppId] = [item];
    }
  });

  return itemsPerBpp;
};

export const getPayloadForQuoteRequest = (
  cartItemsPerBppPerProvider: ItemPerBpp,
  transactionId: { transactionId: string }
) => {
  const payload: any = {
    selectRequestDto: [],
  };
  Object.keys(cartItemsPerBppPerProvider).forEach((bppId) => {
    Object.keys(cartItemsPerBppPerProvider[bppId]).forEach((providerId) => {
      const cartItem = {
        context: {
          // eslint-disable-next-line camelcase
          transaction_id: transactionId.transactionId,
          bpp_id: bppId,
          bpp_uri: cartItemsPerBppPerProvider[bppId][providerId].bpp_uri,
          domain: "retail",
        },
        message: {
          order: {
            items: [
              {
                quantity: {
                  count: cartItemsPerBppPerProvider[bppId][providerId].quantity,
                },

                id: cartItemsPerBppPerProvider[bppId][providerId].id,
              },
            ],
            provider: {
              id: cartItemsPerBppPerProvider[bppId][providerId].providerId,
            },
            locations: cartItemsPerBppPerProvider[bppId][providerId].locations,
          },
        },
      };

      payload.selectRequestDto.push(cartItem);
    });
  });
  return payload;
};
