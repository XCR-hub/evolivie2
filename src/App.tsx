
import React, { useEffect, useState } from "react";
import { neolianeService, Product } from "./services/NeolianeService";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const token = "TON_TOKEN_ICI";
        const res = await neolianeService.getProductsWithFormulas(token);
        setProducts(res);
      } catch (err: any) {
        setError(err.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Evolivie Santé</h1>
      {loading ? (
        <p>Chargement des offres...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.gammeId} className="border rounded p-4 shadow">
              <h2 className="text-xl font-semibold">{p.gammeLabel}</h2>
              <p className="text-gray-500">Type: {p.type}</p>
              <ul className="mt-2 text-left">
                {p.formulas.map((f) => (
                  <li key={f.formula_id}>Formule {f.formula_id} - {f.price} €</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
