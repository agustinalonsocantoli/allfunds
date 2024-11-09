import { z } from 'zod';

export const validateData = async (schema, data) => {
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

export const validateImage = async (file) => {
    if (!file) {
        return {
            error: {
                message: "Validation error",
                error: [
                    {
                        expected: "file",
                        received: "undefined",
                        path: ["image"],
                        message: "Required"
                    }
                ],
            },
        }
    } else if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/png') {
        return {
            message: "Validation error",
            error: [
                {
                    type: "file",
                    expected: "image/jpeg, image/jpg, image/png",
                    received: file.mimetype,
                    path: ["image"],
                    message: "Image must be a jpeg, jpg or png"
                }
            ],
        }
    } else if (file.size > 10000000) {
        return {
            message: "Validation error",
            error: [
                {
                    type: "file",
                    expected: "10MB",
                    received: file.size,
                    path: ["image"],
                    message: "Image size must be less than 10MB"
                }
            ]
        }
    }

    return { file }
}
