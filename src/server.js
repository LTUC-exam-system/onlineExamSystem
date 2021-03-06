'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const routerQ = require('./routes/options.js');
const routerOp = require('./routes/questions.js');
const notFound = require('./middleware/404.js');
const errorHandler = require('./middleware/404.js');


app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/', routerQ);
app.use('/', routerOp);

app.get('/error', (req, res) => {
    throw new Error('a test error');
});

app.use('*', notFound);
app.use(errorHandler);

module.exports = {
    server: app,
    start: port => {
        let PORT = port || process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Listening on ${PORT}`);
        })
    }
};