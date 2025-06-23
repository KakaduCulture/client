const API_URL = "http://10.0.0.60:10000/api";

export async function getUnpaidOrders(customerId: string) {
  try {
    const res = await fetch(`${API_URL}/orders/unpaid?customerId=${customerId}`);
    if (!res.ok) throw new Error("Failed to fetch unpaid orders");
    return await res.json();
  } catch (err) {
    console.error("getUnpaidOrders error:", err);
    return [];
  }
}