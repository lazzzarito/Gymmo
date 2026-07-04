import { StateCreator } from 'zustand';

export interface ModalSlice {
    openModals: Record<string, boolean>;
    openModal: (id: string) => void;
    closeModal: (id: string) => void;
    toggleModal: (id: string) => void;
}

export const createModalSlice: StateCreator<ModalSlice, [], [], ModalSlice> = (set) => ({
    openModals: {},
    openModal: (id) => set((state) => ({
        openModals: { ...state.openModals, [id]: true },
    })),
    closeModal: (id) => set((state) => ({
        openModals: { ...state.openModals, [id]: false },
    })),
    toggleModal: (id) => set((state) => ({
        openModals: { ...state.openModals, [id]: !state.openModals[id] },
    })),
});
