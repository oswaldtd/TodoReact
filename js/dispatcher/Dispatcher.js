var Promise = require('es6-promise').Promise;
var assign = require('object-assign');

var _callbacks= [];
var _promises = [];

var Dispatcher = function() {};
Dispatcher.prototype = assign({}, Dispatcher.prototype, {

  //Register a store's callback so that is may be invoked by an action.
  //@parm {function} callback The callback to be registered.
  //@ return {number} The index of the callback within the _callbacks array.

  register: function(callback) {
    _callbacks.push(callback);
    return _callbacks.length - 1; //index
  },

  //dispatch
  //@parm {object} payload the data from the action.

  dispatch: function(payload) {
    //first create array of ppromises for callbacks to reference.
    var resolves = [];
    car rejects =[];
    _promises = _callbacks.map(function(_, i) {
      return new Promise(function(resolve, reject) {
        resolves[i] = resolve;
        rejects[i] = reject;
      });
    });
    //Dispatch to callbacks and resolve/reject promises.
    _callbacks.forEach(function(callback, i) {
      //Callback can return an obj, resolve, or a promise, to chain.
      // See waitFor() for why this migh be useful.
      Promise.resolve(callback(payload)).then(function() {
        resolves[i] (payload);
      }, function() {
        rejects[i](new Error('Dispathcer callback unsuccessful'));
      });
    });
    _promises = [];
  }
});

module.exports = Dispathcer;
