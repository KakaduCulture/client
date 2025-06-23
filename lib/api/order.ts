const API_URL = "http://192.168.202.75:10000/api";

export async function getUnpaidOrders(customerId: string) {
  try {
    const res = await fetch(`${API_URL}/order/checkout/${customerId}`);
    if (!res.ok) throw new Error("Failed to fetch unpaid orders");
    return await res.json();
  } catch (err) {
    console.error("getUnpaidOrders error:", err);
    return [];
  }
}

export async function payOrder(customerId: string) {
  const res = await fetch(`${API_URL}/payment/${customerId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error("Payment failed: " + text);
  }
}