import Joi from 'joi';

// This is a middleware factory. It takes a Joi schema and returns an Express middleware.
export const validate = (schema) => (req, res, next) => {
    // We validate the request body against the provided schema
    const { error } = schema.validate(req.body, {
        abortEarly: false, // This option returns all errors, not just the first one
        stripUnknown: true, // Remove unknown keys from the validated object
    });

    if (error) {
        // If validation fails, map the error details to a cleaner format
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }
    
    // If validation is successful, move on to the next middleware (our controller)
    next();
};
