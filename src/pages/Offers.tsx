import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OfferCard from '../components/OfferCard';
import { useAppContext } from '../context/AppContext';
import { getProductsWithFormulas } from '../services/NeolianeService';
import type { Offer } from '../types';

export default function Offers() {
  const { profile, setOffer, setLeadId } = useAppContext();
  const navigate = useNavigate();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!profile) {
      navigate('/');
      return;
    }
    setLoading(true);
    getProductsWithFormulas(profile)
      .then(({ offers, leadId }) => {
        setOffers(offers);
        setLeadId(leadId);
      })
      .finally(() => setLoading(false));
  }, [profile]);

  const handleSelect = (offer: Offer) => {
    const formula = offer.formulas[0];
    setOffer({ productId: String(offer.gammeId), formulaId: formula.formula_id, price: formula.price });
    navigate('/souscription');
  };

  if (loading) return <div className="text-center p-8">Chargement...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 grid gap-4 md:grid-cols-2">
      {offers.map((o) => (
        <OfferCard key={o.gammeId} product={o} formula={o.formulas[0]} onSelect={() => handleSelect(o)} />
      ))}
    </div>
  );
}
