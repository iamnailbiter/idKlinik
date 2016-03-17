(function (app) {
    'use strict';

    app.registerModule('patients',['angularMoment']);
    app.registerModule('patients.services');
    app.registerModule('patients.routes', ['ui.router', 'patients.services']);
})(ApplicationConfiguration);
