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
                    localStorage.setItem('task', JSON.stringify(newTasks));
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
                    localStorage.setItem('task', JSON.stringify(updatedTask));
                    return { tasks: updatedTask };
                })
            },
            deleteTask: (id) => {
                set((state) => {
                    const deletedTask = state.tasks.filter((t) => t.id !== id);
                    localStorage.setItem('task', JSON.stringify(deletedTask));
                    return { tasks: deletedTask }
                })
            },
            deleteAllTask: () => {
                localStorage.removeItem('task')
                set({ tasks: [] })
            },
            deleteTaskColor: (colorHex) => {
                set((state) => {
                    console.log("Before deleteTaskColor:", state.tasks);
                    const updatedTask = state.tasks.map((t) => t.color === colorHex ? { ...t, color: "#000000" } : t)
                    console.log("After deleteTaskColor:", updatedTask);
                    localStorage.setItem('task', JSON.stringify(updatedTask));
                    return { tasks: updatedTask };
                });
            },
        }), { name: "task-storage" }
    ));


export default useTaskStore;