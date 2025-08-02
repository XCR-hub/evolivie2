
export interface Product {
  gammeId: number;
  gammeLabel: string;
  type: string;
  formulas: Formula[];
}

export interface Formula {
  product_id: string;
  formula_id: string;
  price: string;
}

export class NeolianeService {
  private readonly PROXY_URL = 'https://evolivie.com/proxy-neoliane.php';

  async getProductsWithFormulas(accessToken: string): Promise<Product[]> {
    const products = await this.getProducts(accessToken);
    const formulas = await this.getFormulasViaCart(accessToken);
    return this.mapFormulasToProducts(products, formulas);
  }

  private async getProducts(token: string) {
    const res = await this.callProxy({
      action: 'getProducts',
      endpoint: 'api/products',
      method: 'GET',
      token
    });
    return res.value || [];
  }

  private async getFormulasViaCart(token: string) {
    const today = new Date();
    const payload = {
      total_amount: "1",
      profile: {
        date_effect: {
          year: today.getFullYear().toString(),
          month: String(today.getMonth() + 1).padStart(2, "0"),
          day: String(today.getDate()).padStart(2, "0")
        },
        zipcode: "75001",
        producttype: "sante",
        members: [{ concern: "a1", birthyear: "1985", regime: "1" }]
      }
    };

    const res = await this.callProxy({
      action: 'createCart',
      endpoint: 'api/cart',
      method: 'POST',
      token,
      body: payload
    });

    const member = res.value?.profile?.members?.[0];
    return member?.products || [];
  }

  private mapFormulasToProducts(products: any[], formulas: Formula[]): Product[] {
    return products.map(p => ({
      gammeId: p.gammeId,
      gammeLabel: p.gammeLabel || `Produit ${p.gammeId}`,
      type: p.type,
      formulas: formulas.filter(f => f.product_id === String(p.gammeId))
    }));
  }

  private async callProxy(body: any) {
    const res = await fetch(this.PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`Proxy error ${res.status}`);
    return await res.json();
  }
}

export const neolianeService = new NeolianeService();
