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