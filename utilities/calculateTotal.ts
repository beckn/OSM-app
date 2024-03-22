export const getAmountFromInitRequest = (initRequestData:any) => {
    if (initRequestData && initRequestData.length > 0) {
        const order = initRequestData[0]?.message?.catalogs?.responses?.[0]?.message?.order;
        if (order && order.quote && order.quote.price) {
            return order.quote.price.value;
        }
    }
    return null;
};
