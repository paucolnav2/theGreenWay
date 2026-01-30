import { create } from 'zustand';

interface ModoOscuro {
  modoNoche: boolean;
  toggleModoNoche: () => void;
}

export const useModoOscuro = create<ModoOscuro>((set) => ({
  modoNoche: false,
  toggleModoNoche: () => set((state) => ({ modoNoche: !state.modoNoche })),
}));