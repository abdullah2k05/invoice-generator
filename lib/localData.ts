"use client";

import { getStorageItem, setStorageItem } from "@/lib/storage";

export interface SavedClient {
  id: string;
  companyName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  taxId: string;
  logo: string;
}

export interface SavedProduct {
  id: string;
  name: string;
  price: number;
}

export interface StoredInvoice {
  id: string;
  invoiceNumber: string;
  date: string;
  client: string;
  total: number;
  currency: string;
  data: Record<string, string>;
  items: Item[];
  templateId: string;
}

export interface BusinessProfile {
  yourName: string;
  yourEmail: string;
  yourAddress: string;
  yourCity: string;
  yourState: string;
  yourCountry: string;
  yourZip: string;
  yourTaxId: string;
  yourLogo: string;
}

const KEYS = {
  CLIENTS: "saved_clients",
  PRODUCTS: "saved_products",
  INVOICES: "invoice_history",
  PROFILE: "business_profile",
  INVOICE_COUNTER: "invoice_counter",
};

async function get<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await getStorageItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

async function set<T>(key: string, value: T): Promise<void> {
  try {
    await setStorageItem(key, JSON.stringify(value));
  } catch {
    // storage not available
  }
}

export async function getBusinessProfile(): Promise<BusinessProfile> {
  return get<BusinessProfile>(KEYS.PROFILE, {
    yourName: "", yourEmail: "", yourAddress: "", yourCity: "",
    yourState: "", yourCountry: "", yourZip: "", yourTaxId: "", yourLogo: "",
  });
}

export async function saveBusinessProfile(profile: BusinessProfile): Promise<void> {
  await set(KEYS.PROFILE, profile);
}

export async function getClients(): Promise<SavedClient[]> {
  return get<SavedClient[]>(KEYS.CLIENTS, []);
}

export async function saveClient(client: SavedClient): Promise<void> {
  const clients = await getClients();
  const filtered = clients.filter((c) => c.id !== client.id);
  filtered.unshift(client);
  await set(KEYS.CLIENTS, filtered);
}

export async function deleteClient(id: string): Promise<void> {
  const clients = await getClients();
  await set(KEYS.CLIENTS, clients.filter((c) => c.id !== id));
}

export async function getProducts(): Promise<SavedProduct[]> {
  return get<SavedProduct[]>(KEYS.PRODUCTS, []);
}

export async function saveProduct(product: SavedProduct): Promise<void> {
  const products = await getProducts();
  const filtered = products.filter((p) => p.id !== product.id);
  filtered.unshift(product);
  await set(KEYS.PRODUCTS, filtered);
}

export async function deleteProduct(id: string): Promise<void> {
  const products = await getProducts();
  await set(KEYS.PRODUCTS, products.filter((p) => p.id !== id));
}

export async function getInvoiceHistory(): Promise<StoredInvoice[]> {
  return get<StoredInvoice[]>(KEYS.INVOICES, []);
}

export async function saveInvoice(invoice: StoredInvoice): Promise<void> {
  const history = await getInvoiceHistory();
  history.unshift(invoice);
  if (history.length > 50) history.length = 50;
  await set(KEYS.INVOICES, history);
}

export async function deleteInvoice(id: string): Promise<void> {
  const history = await getInvoiceHistory();
  await set(KEYS.INVOICES, history.filter((i) => i.id !== id));
}

export async function getInvoiceCounter(): Promise<number> {
  return get<number>(KEYS.INVOICE_COUNTER, 0);
}

export async function incrementInvoiceCounter(): Promise<number> {
  const next = (await getInvoiceCounter()) + 1;
  await set(KEYS.INVOICE_COUNTER, next);
  return next;
}

export async function resetInvoiceCounter(): Promise<void> {
  await set(KEYS.INVOICE_COUNTER, 0);
}

export async function exportAllData(): Promise<string> {
  return JSON.stringify({
    version: 1,
    exportedAt: new Date().toISOString(),
    profile: await getBusinessProfile(),
    clients: await getClients(),
    products: await getProducts(),
    invoices: await getInvoiceHistory(),
    counter: await getInvoiceCounter(),
  }, null, 2);
}

export async function importAllData(json: string): Promise<boolean> {
  try {
    const data = JSON.parse(json);
    if (!data.version || typeof data.version !== "number") return false;
    if (data.profile && typeof data.profile === "object") await set(KEYS.PROFILE, data.profile);
    if (Array.isArray(data.clients)) await set(KEYS.CLIENTS, data.clients);
    if (Array.isArray(data.products)) await set(KEYS.PRODUCTS, data.products);
    if (Array.isArray(data.invoices)) await set(KEYS.INVOICES, data.invoices);
    if (typeof data.counter === "number") await set(KEYS.INVOICE_COUNTER, data.counter);
    return true;
  } catch {
    return false;
  }
}
