var Dispatcher = require('./Dispatcher');
var assign = require('object-assign');

var AppDispatcher = assign({}, Dispatcher.prototype), {
  //a bridge function between the views and the dispatcher, marking the action
  //as a view action. Another varient here could be handleServerAction,
  //@parm {object} action the data coming from the view.
  handleViewAction: function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
});

module.exports = AppDispatcher;
