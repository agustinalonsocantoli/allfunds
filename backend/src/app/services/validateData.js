import { z } from 'zod';

export const validateData = (schema, data) => {
    try {
        const validatedData = schema.parse(data);

        return { data: validatedData };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                error: {
                    message: "Validation error",
                    error: error.errors,
                },
            };
        }

        return { error: error.message };
    }
}