import { create } from 'zustand';
import { ITask, TaskStatus } from '@/types/Task';
import { nanoid } from 'nanoid';
import { INITIAL_TASKS } from '@/constants/Task.constants';


interface TaskState {
    tasks: ITask[],
    initTask: () => void,
    addTask: (title: string, description: string, status: TaskStatus) => void,
    updateTask: (id: string, title: string, description: string, status: TaskStatus) => void,
    deleteTask: (id: string) => void,
}

const useTaskStore = create<TaskState>((set) => ({
    tasks: [],
    initTask: () => {
        const storedTask = localStorage.getItem('task');
        if (storedTask) {
            try {
                set({ tasks: JSON.parse(storedTask) })
            } catch (error) {
                console.error('Failed to get item from localStorage : ', error);
            }
        } else {
            set({ tasks: INITIAL_TASKS });
        }
    },
    addTask: (title, description, status) => {
        const newTask: ITask = {
            id: nanoid(),
            description: description,
            status: status,
            title: title,
        }
        set((state) => {
            const newTasks = [...state.tasks, newTask];
            localStorage.setItem('task', JSON.stringify(newTasks));
            return { tasks: newTasks };
        });
    },
    updateTask: (id, title, description, status) => {
        set((state) => {
            const updatedTask = state.tasks.map((t) => (
                t.id === id ?
                    {
                        ...t,
                        title,
                        description,
                        status
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
    }
}));


export default useTaskStore;