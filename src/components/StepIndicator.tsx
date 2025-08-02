import { useLocation } from 'react-router-dom';

const steps = ['Profil', 'Offres', 'Souscription', 'Confirmation'];
const paths = ['/', '/offres', '/souscription', '/confirmation'];

export default function StepIndicator() {
  const location = useLocation();
  const current = paths.indexOf(location.pathname);
  return (
    <div className="bg-white shadow mb-4">
      <div className="max-w-4xl mx-auto flex justify-between p-4">
        {steps.map((step, idx) => (
          <div
            key={step}
            className={`flex-1 text-center ${idx <= current ? 'font-semibold text-blue-600' : 'text-gray-400'}`}
          >
            {idx + 1}. {step}
          </div>
        ))}
      </div>
    </div>
  );
}
