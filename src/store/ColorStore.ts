import { IColor } from "@/types/Color";
import { nanoid } from "nanoid";
import { create } from "zustand";



interface ColorState {
    colors: IColor[];
    initColor: () => void;
    addColor: (label: string, hex: string) => void;
    updateColor: (id: string, label: string, hex: string) => void,
    removeColor: (id: string) => void;
    removeAll: () => void;
}


const useColorStore = create<ColorState>((set) => ({
    colors: [],
    initColor: () => {
        const storedColor = localStorage.getItem('colors');
        if (storedColor) {
            try {
                set({ colors: JSON.parse(storedColor) })
            } catch (error) {
                console.error('Failed to get item from localStorage :', error)
            }
        } else {
            set({ colors: [] });
        }
    },
    addColor: (label, hex) => {
        const newColor: IColor = {
            id: nanoid(),
            label,
            hex,
        };
        set((state) => {
            const newColors = [...state.colors, newColor]
            localStorage.setItem('colors', JSON.stringify(newColors))
            return { colors: newColors }
        })
    },
    updateColor: (id, label, hex) => {
        set((state) => {
            const updatedColor = state.colors.map((c) => (
                c.id === id ?
                    {
                        ...c,
                        label,
                        hex
                    }
                    : c
            ))
            localStorage.setItem('colors', JSON.stringify(updatedColor))
            return { colors: updatedColor }
        })
    },
    removeColor: (id) => {
        set((state) => {
            const filteredColor = state.colors.filter((c) => c.id !== id);
            localStorage.setItem('colors', JSON.stringify(filteredColor))
            return { colors: filteredColor }
        })
    },
    removeAll: () => {
        localStorage.removeItem('colors');
        set({ colors: [] })
    }
}))

export default useColorStore;