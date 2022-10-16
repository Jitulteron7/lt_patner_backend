const mongoose = require('mongoose');;
const logger = require('../config/logger');
const { config } = require('../config/configVar');
const NAMESPACE = 'SERVER';

function connection() {
    return mongoose
        .connect(config.mongo.url, config.mongo.options)
        .then((result) => {
            logger.info(NAMESPACE, 'Mongo Connected');
        })
        .catch((error) => {
            logger.error(NAMESPACE, error.message, error);
        });
}

module.exports = connection;
