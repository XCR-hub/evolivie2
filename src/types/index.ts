export interface Profile {
  birthyear: string;
  zipcode: string;
  regime: string;
}

export interface Product {
  gammeId: number;
  gammeLabel: string | null;
  type: string;
}

export interface Formula {
  product_id: string;
  formula_id: string;
  price: string;
}

export interface Offer extends Product {
  formulas: Formula[];
}

export interface OfferSelection {
  productId: string;
  formulaId: string;
  price: string;
}
