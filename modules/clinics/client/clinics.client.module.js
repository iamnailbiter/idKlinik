(function (app) {
    'use strict';

    app.registerModule('clinics',['angularMoment']);
    app.registerModule('clinics.services');
    app.registerModule('clinics.routes', ['ui.router', 'clinics.services']);
})(ApplicationConfiguration);
