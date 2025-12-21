import { create } from 'zustand';
import { ITask, TaskStatus } from '@/types/Task';
import { nanoid } from 'nanoid';
import { persist } from 'zustand/middleware';


interface TaskState {
    tasks: ITask[],
    addTask: (title: string, description: string, status: TaskStatus, color: string) => void,
    updateTask: (id: string, title: string, description: string, status: TaskStatus, color: string) => void,
    deleteTask: (id: string) => void,
    deleteAllTask: () => void,
    deleteTaskColor: (colorHex: string) => void;
    updateTaskColor: (colorHex: string, updatedColor: string) => void
}

const useTaskStore = create<TaskState>()(
    persist(
        (set) => ({
            tasks: [],
            addTask: (title, description, status, color) => {
                const newTask: ITask = {
                    id: nanoid(),
                    description: description,
                    status: status,
                    title: title,
                    color: color
                }
                set((state) => {
                    const newTasks = [...state.tasks, newTask];
                    return { tasks: newTasks };
                });
            },
            updateTask: (id, title, description, status, color) => {
                set((state) => {
                    const updatedTask = state.tasks.map((t) => (
                        t.id === id ?
                            {
                                ...t,
                                title,
                                description,
                                status,
                                color
                            }
                            : t
                    ))
                    return { tasks: updatedTask };
                })
            },
            deleteTask: (id) => {
                set((state) => {
                    const deletedTask = state.tasks.filter((t) => t.id !== id);
                    return { tasks: deletedTask }
                })
            },
            deleteAllTask: () => {
                set({ tasks: [] })
            },
            deleteTaskColor: (colorHex) => {
                set((state) => {
                    const updatedTask = state.tasks.map((t) => t.color === colorHex ? { ...t, color: "#000000" } : t)
                    return { tasks: updatedTask };
                });
            },
            updateTaskColor: (colorHex, updatedColor) => {
                set((state) => {
                    const updatedTask = state.tasks.map((t) => t.color === colorHex ? { ...t, color: updatedColor } : t)
                    return { tasks: updatedTask };
                })
            }
        }), { name: "task-storage" }
    ));


export default useTaskStore;