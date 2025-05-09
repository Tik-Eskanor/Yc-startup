import {z} from "zod"

export const  StartupFormSchema  = z.object({
    title: z.string().min(5,'Title must be at least 3 characters').max(100),
    author: z.string(),
    description: z.string().min(20).max(500,'Description not exceed 500 characters'),
    category: z.string().min(3).max(20),
    image: z.string().min(3),
    pitch: z.string().min(3)
})