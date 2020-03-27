const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Express Servers
const {app} = require('./server');

// HTTP Cloud Functions
const project_bertie = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}`; // Prepend '/' to keep query params if any
  }

  return app(request, response);
});

module.exports = {
  project_bertie
};