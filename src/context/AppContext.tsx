import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Profile, OfferSelection } from '../types';

interface AppContextType {
  profile?: Profile;
  setProfile: (p: Profile) => void;
  offer?: OfferSelection;
  setOffer: (o: OfferSelection) => void;
  leadId?: string;
  setLeadId: (id: string) => void;
  subscriptionId?: string;
  setSubscriptionId: (id: string) => void;
  contractId?: string;
  setContractId: (id: string) => void;
}

const AppContext = createContext<AppContextType>({
  setProfile: () => {},
  setOffer: () => {},
  setLeadId: () => {},
  setSubscriptionId: () => {},
  setContractId: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile | undefined>(() => {
    const stored = localStorage.getItem('profile');
    return stored ? JSON.parse(stored) : undefined;
  });
  const [offer, setOffer] = useState<OfferSelection | undefined>(() => {
    const stored = localStorage.getItem('offer');
    return stored ? JSON.parse(stored) : undefined;
  });
  const [leadId, setLeadId] = useState<string | undefined>();
  const [subscriptionId, setSubscriptionId] = useState<string | undefined>();
  const [contractId, setContractId] = useState<string | undefined>();

  useEffect(() => {
    if (profile) localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    if (offer) localStorage.setItem('offer', JSON.stringify(offer));
  }, [offer]);

  return (
    <AppContext.Provider value={{ profile, setProfile, offer, setOffer, leadId, setLeadId, subscriptionId, setSubscriptionId, contractId, setContractId }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
