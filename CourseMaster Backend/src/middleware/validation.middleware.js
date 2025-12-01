import { ApiError } from "../utils/ApiError.js";

export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (error) {
        if (error.issues) {
            const errors = error.issues.map((issue) => ({
                path: issue.path.join("."),
                message: issue.message,
            }));
            return next(new ApiError(400, "Validation Error", errors));
        }
        return next(error);
    }
};
