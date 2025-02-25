import CustomError from '../utils/errors/customError.js';

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        req.logger.error(`${err.code}: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message, details: err.details });
    } else {
        req.logger.error(`Unhandled error: ${err.message}`);
        res.status(500).json({ code: 'INTERNAL_SERVER_ERROR', message: 'Internal server error' });
    }
};

export default errorHandler;