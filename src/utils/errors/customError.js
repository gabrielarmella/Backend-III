import errorDictionary from './errorDictionary.js';

class CustomError extends Error {
    constructor(errorType, details = {}) {
        super(errorDictionary[errorType].message);
        this.code = errorDictionary[errorType].code;
        this.details = details;
    }
}

export default CustomError;