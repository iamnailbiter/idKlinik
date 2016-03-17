'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Queues Permissions
 */
exports.invokeRolesPolicies = function () {
    acl.allow([{
        roles: ['admin'],
        allows: [{
            resources: '/api/queues',
            permissions: '*'
        }, {
            resources: '/api/queues/:queueId',
            permissions: '*'
        }]
    }, {
        roles: ['cs'],
        allows: [{
            resources: '/api/queues',
            permissions: ['get', 'post']
        }, {
            resources: '/api/queues/:queueId',
            permissions: ['get']
        }]
    },{
        roles: ['medic'],
        allows: [{
            resources: '/api/queues',
            permissions: ['get', 'post']
        }, {
            resources: '/api/queues/:queueId',
            permissions: ['get', 'put']
        }]
    },{
        roles: ['doctor'],
        allows: [{
            resources: '/api/queues',
            permissions: ['get', 'post']
        }, {
            resources: '/api/queues/:queueId',
            permissions: ['get', 'put']
        }]
    }]);
};

/**
 * Check If Queues Policy Allows
 */
exports.isAllowed = function (req, res, next) {
    var roles = (req.user) ? req.user.roles : ['guest'];

    // If an article is being processed and the current user created it then allow any manipulation
    if (req.queue && req.user && req.queue.user && req.queue.user.id === req.user.id) {
        return next();
    }

    // Check for user roles
    acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
        if (err) {
            // An authorization error occurred
            return res.status(500).send('Unexpected authorization error');
        } else {
            if (isAllowed) {
                // Access granted! Invoke next middleware
                return next();
            } else {
                return res.status(403).json({
                    message: 'User is not authorized'
                });
            }
        }
    });
};
