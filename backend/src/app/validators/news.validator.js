import { z } from 'zod'

export const CreateNewsValidator = z.object({
    title: z.string().min(1).max(20),
    description: z.string().min(1).max(150),
    category: z.string().min(1).max(20),
    content: z.string().min(1).max(700),
})

export const UpdateNewsValidator = z.object({
    archived: z.boolean(),
})
