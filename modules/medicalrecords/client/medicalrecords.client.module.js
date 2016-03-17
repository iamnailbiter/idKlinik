(function (app) {
    'use strict';

    app.registerModule('medicalrecords');
    app.registerModule('medicalrecords.services');
    app.registerModule('medicalrecords.routes', ['ui.router', 'medicalrecords.services']);
})(ApplicationConfiguration);
