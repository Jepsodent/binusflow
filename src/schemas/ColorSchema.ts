import { z } from "zod";


export const ColorSchema = z.object({
    label: z.string().min(1, 'Label Required'),
    hex: z.string().min(1, 'Color Required')
});

export type ColorFormValue = z.infer<typeof ColorSchema>
