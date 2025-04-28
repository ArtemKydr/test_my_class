const logLevel = require('../config/app').logs;

module.exports = (err, req, res, next) => {
    switch (err.name) {
        case 'ValidationError':
            return res.status(400).send({
                success: false,
                message: err.name,
                details: err.errors.join(', '),
            });

        case 'error':
            if (err.severity && err.code) {
                console.error(`Postgres Error`, err.toString());

                if (logLevel === 'dev') {
                    return res.status(400).send({
                        success: false,
                        message: `Error: ${err.toString()}`,
                    });
                }

                return res.status(400).send({
                    success: false,
                    message: `DB error. Code: ${err.code}`,
                });
            }
            break;

        default:
            console.error(`Unknown source`, err);
            return res.status(400).send({
                success: false,
                message: err.toString(),
            });
    }
};
