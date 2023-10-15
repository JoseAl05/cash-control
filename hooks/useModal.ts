import { Server } from '@prisma/client';
import { create } from 'zustand';

export type ModalType = 'createExpense' | 'createIncome' | 'editExpense' | 'editIncome';

// interface ModalData {
//   server?: Server;
// }

interface ModalProps {
  type: ModalType | null;
  //   data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<ModalProps>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false, type: null }),
}));
