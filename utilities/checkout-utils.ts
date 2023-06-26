import { CartRetailItem, DataPerBpp } from "../lib/types/cart";
import { ResponseModel } from "../lib/types/responseModel";
import { ShippingFormData } from "../pages/checkoutPage";

export const getPayloadForInitRequest = (
  cartItemsPerBppPerProvider: DataPerBpp,
  transactionId: { transactionId: string },
  customerAddress: ShippingFormData
) => {
  const payload: any = {
    initRequestDto: [],
  };

  Object.keys(cartItemsPerBppPerProvider).forEach((bppId) => {
    const cartItem: any = {
      context: {
        transaction_id: transactionId.transactionId,
        bpp_id: bppId,
        bpp_uri: cartItemsPerBppPerProvider[bppId][0].bpp_uri,
        domain: "retail",
      },
      message: {
        order: {
          items: [],
          provider: {
            id: cartItemsPerBppPerProvider[bppId][0].providerId,
            locations: [
              {
                id: cartItemsPerBppPerProvider[bppId][0].location_id,
              },
            ],
          },
          addOns: [],
          offers: [],
          billing: {
            name: `./${customerAddress.name}/////`,
            phone: "9191223433",
            address: {
              door: "",
              building: customerAddress.buildingName,
              city: "Bengaluru",
              state: "Karnataka",
              country: "IND",
              area_code: customerAddress.pincode,
            },
            email: "testemail1@mailinator.com",
          },
          fulfillment: {
            type: "HOME-DELIVERY",
            end: {
              location: {
                gps: cartItemsPerBppPerProvider[bppId][0].locations[0].gps,
                address: {
                  door: "",
                  building: customerAddress.buildingName,
                  street:
                    "Bengaluru, Bengaluru Urban, Bangalore Division, Karnataka",
                  city: "Bengaluru",
                  state: "Karnataka",
                  country: "IND",
                  area_code: "560076",
                },
              },
              contact: {
                phone: "9191223433",
                email: "testemail1@mailinator.com",
              },
            },
            customer: {
              person: {
                name: `./${customerAddress.name}/////`,
              },
            },
            id: cartItemsPerBppPerProvider[bppId][0].providerId,
          },
        },
      },
    };
    cartItemsPerBppPerProvider[bppId].forEach((item: any) => {
      if (item.bpp_id === bppId) {
        const itemObject = {
          quantity: {
            count: item.quantity,
          },
          id: item.id,
        };
        cartItem.message.order.items.push(itemObject);
      }
    });
    payload.initRequestDto.push(cartItem);
  });
  return payload;
};

export const getSubTotalAndDeliveryCharges = (
  initData: (ResponseModel & ResponseModel[]) | null
) => {
  let subTotal = 0;
  let totalDeliveryCharge = 0;

  if (initData) {
    initData.forEach((data) => {
      const deliveryAmount = parseFloat(
        data.message.catalogs.responses[0].message.order.quote.breakup[1].price
          .value
      );
      totalDeliveryCharge += deliveryAmount;

      const subTotalAmount = parseFloat(
        data.message.catalogs.responses[0].message.order.quote.breakup[0].price
          .value
      );

      subTotal += subTotalAmount;
    });
  }

  return { subTotal, totalDeliveryCharge };
};

export const getTotalCartItems = (cartItems: CartRetailItem[]) => {
  let quantity = 0;

  cartItems.forEach((item) => {
    quantity += item.quantity;
  });

  return quantity;
};
