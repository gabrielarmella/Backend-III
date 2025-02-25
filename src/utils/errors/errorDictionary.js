const errorDictionary = {
    USER_ALREADY_EXISTS: {
        code: 'USER_ALREADY_EXISTS',
        message: 'El usuario ya existe.'
    },
    USER_NOT_FOUND: {
        code: 'USER_NOT_FOUND',
        message: 'El usuario no fue encontrado.'
    },
    PET_ALREADY_EXISTS: {
        code: 'PET_ALREADY_EXISTS',
        message: 'La mascota ya existe.'
    },
    PET_NOT_FOUND: {
        code: 'PET_NOT_FOUND',
        message: 'La mascota no fue encontrada.'
    },
    VALIDATION_ERROR: {
        code: 'VALIDATION_ERROR',
        message: 'Error de validación.'
    },
    DATABASE_ERROR: {
        code: 'DATABASE_ERROR',
        message: 'Error en la base de datos.'
    },
    UNAUTHORIZED: {
        code: 'UNAUTHORIZED',
        message: 'No autorizado.'
    }
};

export default errorDictionary;