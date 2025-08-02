import { useAppContext } from '../context/AppContext';

export default function Confirmation() {
  const { contractId } = useAppContext();
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Souscription terminée</h1>
      {contractId && <p className="mb-2">Contrat ID: {contractId}</p>}
      <p>Un accusé de réception vous a été envoyé.</p>
    </div>
  );
}
