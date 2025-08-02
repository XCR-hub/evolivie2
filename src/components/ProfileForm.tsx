import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import type { Profile, Member } from '../types';
import type { Profile } from '../types';

export default function ProfileForm() {
  const { setProfile } = useAppContext();
  const navigate = useNavigate();
  const [zipcode, setZipcode] = useState('');
  const [birthyear, setBirthyear] = useState('');
  const [regime, setRegime] = useState('1');
  const [hasSpouse, setHasSpouse] = useState(false);
  const [spouseBirthyear, setSpouseBirthyear] = useState('');
  const [spouseRegime, setSpouseRegime] = useState('1');
  const [children, setChildren] = useState<{ birthyear: string; regime: string }[]>([]);
  const addChild = () => setChildren([...children, { birthyear: '', regime: '1' }]);
  const updateChild = (i: number, field: 'birthyear' | 'regime', value: string) => {
    const next = [...children];
    next[i][field] = value;
    setChildren(next);
  };
  const removeChild = (i: number) => setChildren(children.filter((_, idx) => idx !== i));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const members: Member[] = [
      { concern: 'a1', birthyear, regime },
    ];
    if (hasSpouse) {
      members.push({ concern: 'a2', birthyear: spouseBirthyear, regime: spouseRegime });
    }
    children.forEach((c, idx) =>
      members.push({ concern: `e${idx + 1}`, birthyear: c.birthyear, regime: c.regime })
    );
    const profile: Profile = { zipcode, members };
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
        <h2 className="font-semibold">Adhérent principal</h2>
        <label className="block mb-1">Année de naissance</label>
        <input value={birthyear} onChange={(e) => setBirthyear(e.target.value)} required className="w-full border p-2" />
        <label className="block mt-2 mb-1">Régime</label>
        <label className="block mb-1">Régime</label>
        <select value={regime} onChange={(e) => setRegime(e.target.value)} className="w-full border p-2">
          <option value="1">Salarié</option>
          <option value="2">TNS indépendant</option>
          <option value="4">Retraité</option>
        </select>
      </div>
      <div>
        <label className="flex items-center gap-2"><input type="checkbox" checked={hasSpouse} onChange={(e) => setHasSpouse(e.target.checked)} />Ajouter un conjoint</label>
        {hasSpouse && (
          <div className="mt-2 p-2 border rounded">
            <label className="block mb-1">Année de naissance</label>
            <input value={spouseBirthyear} onChange={(e) => setSpouseBirthyear(e.target.value)} required className="w-full border p-2" />
            <label className="block mt-2 mb-1">Régime</label>
            <select value={spouseRegime} onChange={(e) => setSpouseRegime(e.target.value)} className="w-full border p-2">
              <option value="1">Salarié</option>
              <option value="2">TNS indépendant</option>
              <option value="4">Retraité</option>
            </select>
          </div>
        )}
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold">Enfants</h2>
          <button type="button" onClick={addChild} className="text-blue-600">+ Ajouter</button>
        </div>
        {children.map((child, i) => (
          <div key={i} className="p-2 mb-2 border rounded">
            <div className="flex justify-between">
              <span>Enfant {i + 1}</span>
              <button type="button" onClick={() => removeChild(i)} className="text-red-600">Supprimer</button>
            </div>
            <label className="block mt-2 mb-1">Année de naissance</label>
            <input value={child.birthyear} onChange={(e) => updateChild(i, 'birthyear', e.target.value)} required className="w-full border p-2" />
            <label className="block mt-2 mb-1">Régime</label>
            <select value={child.regime} onChange={(e) => updateChild(i, 'regime', e.target.value)} className="w-full border p-2">
              <option value="1">Salarié</option>
              <option value="2">TNS indépendant</option>
              <option value="4">Retraité</option>
            </select>
          </div>
        ))}
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Voir les offres</button>
    </form>
  );
}
