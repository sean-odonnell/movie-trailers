const restful = require('node-restful');

module.exports = function (app, route) {
  // setup model for RESTful
  var rest = restful.model(
    'movie',
    app.models.movie
  ).methods([
    'get',
    'put',
    'post',
    'delete'
  ]);
  // register endpoint with this application
  rest.register(app, route);

  // return to MIDDLEWARE
  return function (req, res, next) {
    next();
  }
}
