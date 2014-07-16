/**
 * Created by dmitrymaklygin on 16.07.14.
 */
var extend = require('extend');
var Events = require('./events');

var Tournaments = exports.Tournaments = function(tournaments) {

  this.data = {};

  tournaments && this.parse(tournaments);
};

Tournaments.prototype.get = function (tournamentId) {
  return this.data[tournamentId];
};

Tournaments.prototype.set = function (tournament) {

  var oldTournament = this.get(tournament.id);

  if (!oldTournament) {
    return false;
  }

  for (var key in oldTournament) {
    switch (key) {
      case 'events':
        oldTournament.events.merge(tournament.events);
        break;
      default:
        oldTournament[key] = tournament[key];
        break;
    }
  }

  return true;
};

Tournaments.prototype.add = function (tournament) {
  tournament.events = new Events(tournament.events);
  this.data[tournament.id] = tournament;
};


Tournaments.prototype.parse = function(tournaments) {

  var _this = this;

  tournaments.forEach(function(tournament) {
    if (_this.get(tournament.id)) {
      _this.set(tournament);
    } else {
      _this.add(tournament);
    }
  });
};

Tournaments.prototype.merge = function(tournaments) {
  this.parse(tournaments);
};

exports.createTournaments = function () {
  return new Tournaments();
};