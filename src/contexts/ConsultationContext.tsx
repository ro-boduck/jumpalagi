'use client';
import React, { createContext, useContext, useState } from 'react';

interface ConsultationContextType {
  isConsultOpen: boolean;
  selectedPackage: string;
  openConsult: (packageName?: string) => void;
  closeConsult: () => void;
}

const ConsultationContext = createContext<ConsultationContextType>({
  isConsultOpen: false,
  selectedPackage: '',
  openConsult: () => {},
  closeConsult: () => {},
});

export function ConsultationProvider({ children }: { children: React.ReactNode }) {
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');

  const openConsult = (packageName?: string) => {
    setSelectedPackage(packageName || '');
    setIsConsultOpen(true);
  };

  const closeConsult = () => {
    setIsConsultOpen(false);
    setSelectedPackage('');
  };

  return (
    <ConsultationContext.Provider value={{ isConsultOpen, selectedPackage, openConsult, closeConsult }}>
      {children}
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  return useContext(ConsultationContext);
}
