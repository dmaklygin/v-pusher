
window.Models      = {};
window.Collections = {};
//window.Views       = {}
//window.Modules     = {}
//window.Plugins     = {}

var Application = function() {

  this.init();
};

Application.prototype.init = function() {

  var _this = this;

  this.faye = new Faye.Client('http://localhost:8000/faye');

  this.prematchTournaments = new Collections.Tournaments();
  this.liveTournaments = new Collections.Tournaments();

  this.faye.subscribe('/fullPrematch', function (data) {
    console.log('fullPrematch data: ', data);
    _this.prematchTournaments.set(data, { add: true, merge: true, parse: true, remove: false });
    _this.faye.unsubscribe('/fullPrematch');
  });

  this.faye.subscribe('/fullLive', function (data) {
    console.log('fullLive data: ', data);
    _this.liveTournaments.set(data, { add: true, merge: true, parse: true, remove: false });
    _this.faye.unsubscribe('/fullLive');
  });

  this.faye.subscribe('/line', function (data) {
    console.log('line data: ', data);
    _this.prematchTournaments.set(data, { add: true, merge: true, parse: true, remove: false });
  });

  this.faye.subscribe('/live', function (data) {
    console.log('live data: ', data);
    _this.liveTournaments.set(data, { add: true, merge: true, parse: true, remove: false });
  });

};
