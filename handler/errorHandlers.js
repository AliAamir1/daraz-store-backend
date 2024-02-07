const catchErrors = (fn) => (request, response, next) =>
    fn(request, response, next).catch((err) => {
        console.error('Caught an error:', err);

        let status = 500;
        let message = 'Internal Server Error';
        let errorDetails = null;

        if (err instanceof Error) {
            status = err.status || 500;
            message = err.message || 'Internal Server Error';
            errorDetails = process.env.NODE_ENV === 'production' ? null : err.stack;
        } else if (typeof err === 'string') {
            message = err;
        }

        return response.status(status).json({ message, error: errorDetails });
    });

export { catchErrors };
