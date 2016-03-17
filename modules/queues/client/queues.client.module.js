(function (app) {
    'use strict';

    app.registerModule('queues');
    app.registerModule('queues.services');
    app.registerModule('queues.routes', ['ui.router', 'queues.services']);
})(ApplicationConfiguration);
