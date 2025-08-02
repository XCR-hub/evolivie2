import type { Profile, Offer, Product, Formula } from '../types';

const PROXY_URL = 'https://evolivie.com/proxy-neoliane.php';
const TOKEN = import.meta.env.VITE_NEOLIANE_TOKEN as string;

interface ProxyPayload {
  action: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT';
  token: string;
  body?: any;
}

async function proxyFetch(endpoint: string, method: 'GET' | 'POST' | 'PUT', body?: any, action = 'neoliane') {
  const payload: ProxyPayload = { action, endpoint, method, token: TOKEN, body };
  const res = await fetch(PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Network error');
  return res.json();
}

export async function getProducts(): Promise<Product[]> {
  const res = await proxyFetch('/api/products', 'GET');
  return res.value || [];
}

export async function getCart(profile: Profile) {
  const today = new Date();
  const body = {
    total_amount: '1',
    profile: {
      date_effect: {
        year: String(today.getFullYear()),
        month: String(today.getMonth() + 1),
        day: String(today.getDate()),
      },
      zipcode: profile.zipcode,
      producttype: 'sante',
      members: [
        {
          concern: 'a1',
          birthyear: profile.birthyear,
          regime: profile.regime,
        },
      ],
    },
  };
  return proxyFetch('/api/cart', 'POST', body);
}

export async function getProductsWithFormulas(profile: Profile): Promise<{ offers: Offer[]; leadId: string }> {
  const [productsRes, cartRes] = await Promise.all([getProducts(), getCart(profile)]);
  const formulas: Formula[] = cartRes.value.profile.members[0].products || [];
  const offers: Offer[] = productsRes.map((p: any) => ({
    ...p,
    formulas: formulas.filter((f) => f.product_id === String(p.gammeId)),
  }));
  const leadId = cartRes.value.lead_id as string;
  return { offers, leadId };
}

export async function createSubscription(leadId: string) {
  return proxyFetch('/api/subscription', 'POST', { lead_id: leadId, signtype: '1' });
}

export async function updateStepConcern(subId: string, stepId: string, data: any) {
  return proxyFetch(`/api/subscription/${subId}/stepconcern/${stepId}`, 'PUT', data);
}

export async function updateStepBank(subId: string, stepId: string, data: any) {
  return proxyFetch(`/api/subscription/${subId}/stepbank/${stepId}`, 'PUT', data);
}

export async function getSubscription(subId: string) {
  return proxyFetch(`/api/subscription/${subId}`, 'GET');
}

export async function uploadDocument(subId: string, data: any) {
  return proxyFetch(`/api/subscription/${subId}/document`, 'POST', data);
}

export async function validateContract(contractId: string) {
  return proxyFetch(`/api/contract/${contractId}/validate`, 'PUT', []);
}
