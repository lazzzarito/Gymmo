import { StateCreator } from 'zustand';
import type { ModalSlice, UserState } from './types';

export const createModalSlice: StateCreator<UserState, [], [], ModalSlice> = (set) => ({
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
