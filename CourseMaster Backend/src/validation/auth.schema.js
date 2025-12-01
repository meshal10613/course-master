import { z } from 'zod';

const registerBody = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long.'),
    email: z.string().email('Must be a valid email address.'),
    password: z.string().min(8, 'Password must be at least 8 characters long.'),
});

const loginBody = z.object({
    email: z.string().email('Must be a valid email address.'),
    password: z.string().min(1, 'Password is required.'),
});

export const authSchemas = {
    register: z.object({ body: registerBody }),
    login: z.object({ body: loginBody }),
};