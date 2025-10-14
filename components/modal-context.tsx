'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ModalProps } from '@/components/modal';

// Dynamically import Modal with SSR disabled to ensure it only renders client-side
const Modal = dynamic<ModalProps>(() => import('@/components/modal').then(mod => mod.Modal), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">Loading...</div>
});

interface ModalContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  openModal: (title: string, content: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const openModal = (title: string, content: string) => {
    setTitle(title);
    setContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTitle('');
    setContent('');
  };

  return (
    <ModalContext.Provider value={{ 
      isOpen, 
      setIsOpen, 
      title, 
      setTitle, 
      content, 
      setContent,
      openModal,
      closeModal
    }}>
      {children}
      <ModalTrigger />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

export function ModalTrigger() {
  const { isOpen, closeModal, title, content } = useModal();

  // Close modal when component unmounts or when needed
  useEffect(() => {
    return () => {
      // Clean up if needed
    };
  }, []);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={title}
      content={content}
    />
  );
}