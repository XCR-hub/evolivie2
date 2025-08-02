import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import {
  createSubscription,
  updateStepConcern,
  getSubscription,
  updateStepBank,
  validateContract,
} from '../services/NeolianeService';

export default function SouscriptionForm() {
  const { profile, offer, leadId, subscriptionId, setSubscriptionId, setContractId } = useAppContext();
  const navigate = useNavigate();
  const [stepId, setStepId] = useState('');
  const [step, setStep] = useState<'stepconcern' | 'stepbank'>('stepconcern');
  const [loading, setLoading] = useState(false);

  const [concern, setConcern] = useState({ firstname: '', lastname: '', email: '', phone: '', birthdate: '' });
  const [bank, setBank] = useState({ iban: '', bic: '' });

  useEffect(() => {
    if (!leadId || !offer) return;
    setLoading(true);
    createSubscription(leadId)
      .then((res) => {
        const { id, validate } = res.value;
        setSubscriptionId(id);
        const parts = validate.url.split('/');
        setStepId(parts[parts.length - 1]);
      })
      .finally(() => setLoading(false));
  }, [leadId, offer]);

  const handleConcern = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriptionId) return;
    setLoading(true);
    const [year, month, day] = concern.birthdate.split('-');
    await updateStepConcern(subscriptionId, stepId, {
      members: [
        {
          is_politically_exposed: 0,
          gender: 'M',
          lastname: concern.lastname,
          firstname: concern.firstname,
          regime: 'Salarié',
          birthdate: { day, month, year },
          birthplace: '',
          birthzipcode: '',
          birthcountry: 'France',
          csp: '11',
          numss: '0000000000000',
          numorganisme: '',
        },
      ],
      streetnumber: '1',
      street: '',
      streetbis: '',
      zipcode: profile?.zipcode,
      city: '',
      email: concern.email,
      phone: concern.phone,
    });
    const sub = await getSubscription(subscriptionId);
    const parts = sub.value.validate.url.split('/');
    setStepId(parts[parts.length - 1]);
    setStep('stepbank');
    setLoading(false);
  };

  const handleBank = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriptionId) return;
    setLoading(true);
    await updateStepBank(subscriptionId, stepId, {
      details: [
        {
          levydate: '5',
          levyfrequency: 'Mensuel',
          iban: bank.iban,
          bic: bank.bic,
          isDifferentFromStepConcern: '0',
        },
      ],
    });
    const sub = await getSubscription(subscriptionId);
    const contractId = sub.value.contracts?.[0]?.id;
    if (contractId) {
      await validateContract(contractId);
      setContractId(contractId);
    }
    setLoading(false);
    navigate('/confirmation');
  };

  if (loading) return <div>Chargement...</div>;
  if (!profile || !offer) return <div>Profil incomplet</div>;

  return step === 'stepconcern' ? (
    <form onSubmit={handleConcern} className="space-y-4">
      <div>
        <label className="block mb-1">Prénom</label>
        <input
          className="w-full border p-2"
          value={concern.firstname}
          onChange={(e) => setConcern({ ...concern, firstname: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Nom</label>
        <input
          className="w-full border p-2"
          value={concern.lastname}
          onChange={(e) => setConcern({ ...concern, lastname: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Email</label>
        <input
          className="w-full border p-2"
          value={concern.email}
          onChange={(e) => setConcern({ ...concern, email: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Téléphone</label>
        <input
          className="w-full border p-2"
          value={concern.phone}
          onChange={(e) => setConcern({ ...concern, phone: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Date de naissance</label>
        <input
          type="date"
          className="w-full border p-2"
          value={concern.birthdate}
          onChange={(e) => setConcern({ ...concern, birthdate: e.target.value })}
          required
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Suivant</button>
    </form>
  ) : (
    <form onSubmit={handleBank} className="space-y-4">
      <div>
        <label className="block mb-1">IBAN</label>
        <input
          className="w-full border p-2"
          value={bank.iban}
          onChange={(e) => setBank({ ...bank, iban: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block mb-1">BIC</label>
        <input
          className="w-full border p-2"
          value={bank.bic}
          onChange={(e) => setBank({ ...bank, bic: e.target.value })}
          required
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Valider</button>
    </form>
  );
}

