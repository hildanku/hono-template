import { z } from 'zod'

export const userValidator = z.object({
    username: z.string(),
    name: z.string(),
    role: z.enum(['production_manager', 'operator']),
    avatar: z.string(),
    email: z.string(),
    password: z.string(),
})
