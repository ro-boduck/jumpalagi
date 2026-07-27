'use client';

import React, { createContext, useContext, useState } from 'react';
import { WhatsAppRedirectModal } from '@/components/WhatsAppRedirectModal';

interface WhatsAppRedirectContextType {
  isOpen: boolean;
  packageName: string;
  customMessage?: string;
  triggerRedirect: (packageName: string, customMessage?: string) => void;
  closeRedirect: () => void;
}

const WhatsAppRedirectContext = createContext<WhatsAppRedirectContextType>({
  isOpen: false,
  packageName: '',
  triggerRedirect: () => {},
  closeRedirect: () => {},
});

export function WhatsAppRedirectProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [packageName, setPackageName] = useState('');
  const [customMessage, setCustomMessage] = useState<string | undefined>(undefined);

  const triggerRedirect = (pkgName: string, msg?: string) => {
    setPackageName(pkgName);
    setCustomMessage(msg);
    setIsOpen(true);
  };

  const closeRedirect = () => {
    setIsOpen(false);
    setPackageName('');
    setCustomMessage(undefined);
  };

  return (
    <WhatsAppRedirectContext.Provider value={{ isOpen, packageName, customMessage, triggerRedirect, closeRedirect }}>
      {children}
      <WhatsAppRedirectModal
        isOpen={isOpen}
        packageName={packageName}
        customMessage={customMessage}
        onClose={closeRedirect}
      />
    </WhatsAppRedirectContext.Provider>
  );
}

export function useWhatsAppRedirect() {
  return useContext(WhatsAppRedirectContext);
}
