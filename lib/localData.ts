"use client";

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

function get<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function set<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function getBusinessProfile(): BusinessProfile {
  return get<BusinessProfile>(KEYS.PROFILE, {
    yourName: "", yourEmail: "", yourAddress: "", yourCity: "",
    yourState: "", yourCountry: "", yourZip: "", yourTaxId: "", yourLogo: "",
  });
}

export function saveBusinessProfile(profile: BusinessProfile) {
  set(KEYS.PROFILE, profile);
}

export function getClients(): SavedClient[] {
  return get<SavedClient[]>(KEYS.CLIENTS, []);
}

export function saveClient(client: SavedClient) {
  const clients = getClients().filter((c) => c.id !== client.id);
  clients.unshift(client);
  set(KEYS.CLIENTS, clients);
}

export function deleteClient(id: string) {
  set(KEYS.CLIENTS, getClients().filter((c) => c.id !== id));
}

export function getProducts(): SavedProduct[] {
  return get<SavedProduct[]>(KEYS.PRODUCTS, []);
}

export function saveProduct(product: SavedProduct) {
  const products = getProducts().filter((p) => p.id !== product.id);
  products.unshift(product);
  set(KEYS.PRODUCTS, products);
}

export function deleteProduct(id: string) {
  set(KEYS.PRODUCTS, getProducts().filter((p) => p.id !== id));
}

export function getInvoiceHistory(): StoredInvoice[] {
  return get<StoredInvoice[]>(KEYS.INVOICES, []);
}

export function saveInvoice(invoice: StoredInvoice) {
  const history = getInvoiceHistory();
  history.unshift(invoice);
  if (history.length > 50) history.length = 50;
  set(KEYS.INVOICES, history);
}

export function deleteInvoice(id: string) {
  set(KEYS.INVOICES, getInvoiceHistory().filter((i) => i.id !== id));
}

export function getInvoiceCounter(): number {
  return get<number>(KEYS.INVOICE_COUNTER, 0);
}

export function incrementInvoiceCounter(): number {
  const next = getInvoiceCounter() + 1;
  set(KEYS.INVOICE_COUNTER, next);
  return next;
}

export function resetInvoiceCounter() {
  set(KEYS.INVOICE_COUNTER, 0);
}

export function exportAllData(): string {
  return JSON.stringify({
    version: 1,
    exportedAt: new Date().toISOString(),
    profile: getBusinessProfile(),
    clients: getClients(),
    products: getProducts(),
    invoices: getInvoiceHistory(),
    counter: getInvoiceCounter(),
  }, null, 2);
}

export function importAllData(json: string): boolean {
  try {
    const data = JSON.parse(json);
    if (!data.version) return false;
    if (data.profile) set(KEYS.PROFILE, data.profile);
    if (data.clients) set(KEYS.CLIENTS, data.clients);
    if (data.products) set(KEYS.PRODUCTS, data.products);
    if (data.invoices) set(KEYS.INVOICES, data.invoices);
    if (typeof data.counter === "number") set(KEYS.INVOICE_COUNTER, data.counter);
    return true;
  } catch {
    return false;
  }
}
