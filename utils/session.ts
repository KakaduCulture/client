import * as SecureStore from 'expo-secure-store';

export async function saveCustomer(customer: any) {
    await SecureStore.setItemAsync("customer", JSON.stringify(customer));
  }
  
  export async function getCustomer() {
    const json = await SecureStore.getItemAsync("customer");
    return json ? JSON.parse(json) : null;
  }
  
  export async function deleteCustomer() {
    await SecureStore.deleteItemAsync("customer");
  }