import type { Product, Formula } from '../types';

interface Props {
  product: Product;
  formula: Formula;
  onSelect: () => void;
}

export default function OfferCard({ product, formula, onSelect }: Props) {
  return (
    <div className="border p-4 rounded shadow flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{product.gammeLabel}</h3>
        <p className="text-gray-500">{formula.price} € / mois</p>
      </div>
      <button onClick={onSelect} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Souscrire
      </button>
    </div>
  );
}
