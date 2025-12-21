import { IColor } from "@/types/Color";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import useTaskStore from "./TaskStore";

interface ColorState {
    colors: IColor[];
    addColor: (label: string, hex: string) => void;
    updateColor: (id: string, label: string, hex: string) => void;
    removeColor: (id: string) => void;
    removeAll: () => void;
}

const useColorStore = create<ColorState>()(
    persist(
        (set, get) => ({
            colors: [],
            addColor: (label, hex) => {
                const newColor: IColor = { id: nanoid(), label, hex };
                set((state) => ({ colors: [...state.colors, newColor] }));
            },
            updateColor: (id, label, hex) => {
                set((state) => ({
                    colors: state.colors.map((c) =>
                        c.id === id ? { ...c, label, hex } : c
                    ),
                }));
            },
            removeColor: (id) => {
                set((state) => {
                    const removed = state.colors.find((c) => c.id === id);
                    if (removed) {
                        useTaskStore.getState().deleteTaskColor(removed.hex);
                    }
                    return { colors: state.colors.filter((c) => c.id !== id) };
                });
            },
            removeAll: () => {
                const allColors = get().colors;
                allColors.forEach((c) => {
                    useTaskStore.getState().deleteTaskColor(c.hex);
                })
                set({ colors: [] });
            },
        }),
        {
            name: "colors-storage",
        }
    )
);

export default useColorStore;
