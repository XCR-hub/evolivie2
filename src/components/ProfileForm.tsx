import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import type { Profile } from '../types';

export default function ProfileForm() {
  const { setProfile } = useAppContext();
  const navigate = useNavigate();
  const [birthyear, setBirthyear] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [regime, setRegime] = useState('1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profile: Profile = { birthyear, zipcode, regime };
    setProfile(profile);
    navigate('/offres');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4 bg-white rounded shadow">
      <div>
        <label className="block mb-1">Année de naissance</label>
        <input value={birthyear} onChange={(e) => setBirthyear(e.target.value)} required className="w-full border p-2" />
      </div>
      <div>
        <label className="block mb-1">Code postal</label>
        <input value={zipcode} onChange={(e) => setZipcode(e.target.value)} required className="w-full border p-2" />
      </div>
      <div>
        <label className="block mb-1">Régime</label>
        <select value={regime} onChange={(e) => setRegime(e.target.value)} className="w-full border p-2">
          <option value="1">Salarié</option>
          <option value="2">TNS indépendant</option>
          <option value="4">Retraité</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Voir les offres</button>
    </form>
  );
}
