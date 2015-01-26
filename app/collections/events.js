/**
 * Created by dmitrymaklygin on 16.07.14.
 */

var extend = require('extend');

var Events = module.exports = function (events) {

  this.data = {};

  events && this.parse(events);
};

Events.prototype.parse = function (events) {

  var _this = this;

  events.forEach(function (event) {
    if (_this.get(event.id)) {
      _this.set(event);
    } else {
      _this.add(event);
    }
  });
};

Events.prototype.get = function (eventId) {
  return this.data[eventId];
};

Events.prototype.add = function (event) {
  this.data[event.id] = event;
};

Events.prototype.set = function (event) {
  var oldEvent = this.get(event.id);

  if (!oldEvent) {
    return false;
  }

  for (var key in oldEvent) {
    switch (key) {
      case 'cs':
      case 'cse':
        extend(oldEvent[key], event[key]);
        break;
      default:
        oldEvent[key] = event[key];
        break;
    }
  }
};

Events.prototype.merge = function (events) {
  this.parse(events);
};

Events.prototype.toJSON = function () {
  var data = [];
  for (var i in this.data) {
    data.push(extend({}, this.data[i]));
  }
  return data;
};
