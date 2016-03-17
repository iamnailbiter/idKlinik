'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Medical Records Permissions
 */
exports.invokeRolesPolicies = function () {
    acl.allow([{
        roles: ['admin'],
        allows: [{
            resources: '/api/medicalrecords',
            permissions: 'admin'
        }, {
            resources: '/api/medicalrecords/:medicalrecordId',
            permissions: 'admin'
        }]
    },{
        roles: ['cs'],
        allows: [{
            resources: '/api/medicalrecords',
            permissions: ['get']
        }, {
            resources: '/api/medicalrecords/:medicalrecordId',
            permissions: ['get']
        },{
            resources: '/api/medicalrecords/patient/:patientId',
            permissions: ['get']
        }]
    },{
        roles: ['medic'],
        allows: [{
            resources: '/api/medicalrecords',
            permissions: ['get', 'post']
        },{
            resources: '/api/medicalrecords/:medicalrecordId',
            permissions: ['get', 'put']
        },{
            resources: '/api/medicalrecords/patient/:patientId',
            permissions: ['get']
        }]
    },{
        roles: ['doctor'],
        allows: [{
            resources: '/api/medicalrecords',
            permissions: ['get', 'post']
        },{
            resources: '/api/medicalrecords/:medicalrecordId',
            permissions: ['get', 'put']
        },{
            resources: '/api/medicalrecords/patient/:patientId',
            permissions: ['get']
        }]
    }]);
};

/**
 * Check If Medical Records Policy Allows
 */
exports.isAllowed = function (req, res, next) {
    var roles = (req.user) ? req.user.roles : ['guest'];

    // If an medical record is being processed and the current user created it then allow any manipulation
    if (req.medicalrecord && req.user && req.medicalrecord.user && req.medicalrecord.user.id === req.user.id) {
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
