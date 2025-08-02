import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Subscribe from './pages/Subscribe';
import Confirmation from './pages/Confirmation';
import StepIndicator from './components/StepIndicator';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <StepIndicator />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offres" element={<Offers />} />
        <Route path="/souscription" element={<Subscribe />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </div>
  );
}

export default App;
