import { z } from "zod";
import { TaskStatus } from "@/types/Task";
import { COLUMNS } from "@/constants/Task.constants"

const validStatus = COLUMNS.map((col) => col.id) as TaskStatus[]

export const TaskSchema = z.object({
    title: z.string().min(1, 'Title is required').max(50, 'Title is too long'),
    color: z.string().min(1, 'Please input your color'),
    description: z.string().min(1, 'Description is required').max(100),
    status: z.enum(validStatus, {
        error: "Status is required",
    })
});

export type TaskFormValues = z.infer<typeof TaskSchema>
