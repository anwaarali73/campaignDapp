// Following, the extra pair of paranthesis is because after
// the require statement a function is returned and this extra
// pair of paranthesis immediately invokes it.

const routes = require('next-routes')();

// In the following way, this is how a new route mapping is
// defined. In the routes.add() we pass a pattern and
// :<variable of sorts> represents a wild card

// The order of '.add'ing routes matter as they are parsed in order they are
// added

routes
  .add('/campaigns/new', '/campaigns/new')
  .add('/campaigns/:address', '/campaigns/show')
  .add('/campaigns/:address/requests', '/campaigns/requests/index')
  .add('/campaigns/:address/requests/new', '/campaigns/requests/new');


module.exports = routes;
