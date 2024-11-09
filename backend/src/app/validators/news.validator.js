import { z } from 'zod'

export const CreateNewsValidator = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    category: z.string().min(1),
    image: z.instanceof(File),
    content: z.string().min(1),
})

export const UpdateNewsValidator = z.object({
    archived: z.boolean(),
})
