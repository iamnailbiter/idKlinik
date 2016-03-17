'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Patients Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/patients',
      permissions: '*'
    }, {
      resources: '/api/patients/:patientId',
      permissions: '*'
    }]
  },{
    roles: ['cs'],
    allows: [{
      resources: '/api/patients',
      permissions: ['get', 'post']
    }, {
      resources: '/api/patients/:patientId',
      permissions: ['get', 'put']
    }]
  },{
    roles: ['medic'],
     allows: [{
       resources: '/api/patients',
       permissions: ['get']
     }, {
      resources: '/api/patients/:patientId',
      permissions: ['get']
    }]
  },{
    roles: ['doctor'],
    allows: [{
      resources: '/api/patients',
      permissions: ['get']
    }, {
      resources: '/api/patients/:patientId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Patients Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an article is being processed and the current user created it then allow any manipulation
  //if (req.patient && req.user && req.patient.user && req.patient.user.id === req.user.id) {
  //  return next();
  //}

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
