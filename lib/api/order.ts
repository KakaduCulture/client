import Constants from 'expo-constants';
// const API_URL = "http://192.168.202.75:10000/api";
const API_BASE_URL =
          Constants.expoConfig?.extra?.API_BASE_URL ??
          Constants.manifest2?.extra?.API_BASE_URL;



export async function getUnpaidOrders(customerId: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/orders/checkout/${customerId}`);
    // const res = await fetch(`${API_URL}/order/checkout/${customerId}`);
    if (!res.ok) throw new Error("Failed to fetch unpaid orders");
    return await res.json();
  } catch (err) {
    console.error("getUnpaidOrders error:", err);
    return [];
  }
}

export async function payOrder(customerId: string) {
  const res = await fetch(`${API_BASE_URL}/api/orders/payment/${customerId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error("Payment failed: " + text);
  }
}

// export async function createUnpaidOrder(customerId: number) {
//   const res = await fetch(`${API_BASE_URL}/api/orders/checkout/${customerId}`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//   });

//   if (!res.ok) {
//     const errText = await res.text();
//     throw new Error(errText);
//   }

//   return await res.json();
// }
export const createUnpaidOrder = async (
  userId: number,
  cartItems: Array<{ product_id: number; quantity: number; price: number }>,
  // address: string,
  // mobileNumber: string,
  // email: string
) => {
  // const products = cartItems.map(item => ({
  //   id: item.product_id,
  //   quantity: item.quantity,
  //   price: item.price,
  // }));
  const productsMap: { [key: number]: { id: number; quantity: number; price: number } } = {};

cartItems.forEach(item => {
  if (productsMap[item.product_id]) {
    productsMap[item.product_id].quantity += item.quantity;
  } else {
    productsMap[item.product_id] = {
      id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    };
  }
});

const products = Object.values(productsMap);

  const response = await fetch(`${API_BASE_URL}/api/orders/checkout/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      products,
      // address,
      // mobileNumber,
      // email,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create unpaid order');
  }

  return response.json();
};