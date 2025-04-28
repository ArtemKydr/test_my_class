require('./modules/validator');
const express = require('express');
require('express-async-errors');
const app = express();
const config = require('./config/app');

app.disable('x-powered-by');

app.use(require('./middleware/formatter'));

app.use('/api/lessons', require('./router/lessons/lessonsRouter').getRouter());

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use(require('./middleware/errorHandler'));

app.listen(config.port, () => {
    console.log('test_my_class service listening on port', config.port);
});
