'use strict';

/**
 ** Module dependencies
 */
var queuesPolicy = require('../policies/queues.server.policy'),
    queues = require('../controllers/queues.server.controller');

module.exports = function (app) {
    // Queues collection routes
    app.route('/api/queues').all(queuesPolicy.isAllowed)
        .get(queues.list)
        .post(queues.create);

    // Single queue routes
    app.route('/api/queues/:queueId').all(queuesPolicy.isAllowed)
        .get(queues.read)
        .put(queues.update)
        .delete(queues.delete);

    // Finish by binding the queue middleware
    app.param('queueId', queues.queueByID);
};
