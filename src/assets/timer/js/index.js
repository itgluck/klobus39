(function() {
  var CountDownTimer;

  CountDownTimer = function(dt, id) {
    var _day, _hour, _minute, _second, end, selector, showRemaining, timer;
    selector = document.getElementById(id);
    end = new Date(dt);
    _second = 1000;
    _minute = _second * 60;
    _hour = _minute * 60;
    _day = _hour * 24;
    showRemaining = function() {
      var days, distance, hours, minutes, now, seconds;
      now = new Date();
      distance = end - now;
      if (distance <= 0) {
        clearInterval(timer);
        selector.innerHTML = "Болеем за наших!";
        return;
      }
      days = Math.floor(distance / _day);
      hours = Math.floor((distance % _day) / _hour);
      minutes = Math.floor((distance % _hour) / _minute);
      seconds = Math.floor((distance % _minute) / _second);
      // return selector.innerHTML = days + "days " + hours + "hrs " + minutes + "mins " + seconds + "secs";
      return selector.innerHTML = days + "дн "+ hours + "ч " + minutes + "мин";
    };
    return timer = setInterval(showRemaining, 1000);
  };

  CountDownTimer("06/16/2018 21:00", "countdown");
  // CountDownTimer("07/14/2018 091:00", "countdownKLG");

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLGNBQUEsR0FBaUIsUUFBQSxDQUFDLEVBQUQsRUFBSyxFQUFMLENBQUE7QUFDZixRQUFBLElBQUEsRUFBQSxLQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUEsUUFBQSxFQUFBLGFBQUEsRUFBQTtJQUFBLFFBQUEsR0FBVyxRQUFRLENBQUMsY0FBVCxDQUF3QixFQUF4QjtJQUNYLEdBQUEsR0FBTSxJQUFJLElBQUosQ0FBUyxFQUFUO0lBQ04sT0FBQSxHQUFVO0lBQ1YsT0FBQSxHQUFVLE9BQUEsR0FBVTtJQUNwQixLQUFBLEdBQVEsT0FBQSxHQUFVO0lBQ2xCLElBQUEsR0FBTyxLQUFBLEdBQVE7SUFDZixhQUFBLEdBQWdCLFFBQUEsQ0FBQSxDQUFBO0FBQ2QsVUFBQSxJQUFBLEVBQUEsUUFBQSxFQUFBLEtBQUEsRUFBQSxPQUFBLEVBQUEsR0FBQSxFQUFBO01BQUEsR0FBQSxHQUFNLElBQUksSUFBSixDQUFBO01BQ04sUUFBQSxHQUFXLEdBQUEsR0FBTTtNQUNqQixJQUFHLFFBQUEsSUFBWSxDQUFmO1FBQ0UsYUFBQSxDQUFjLEtBQWQ7UUFDQSxRQUFRLENBQUMsU0FBVCxHQUFxQjtBQUNyQixlQUhGOztNQUlBLElBQUEsR0FBTyxJQUFJLENBQUMsS0FBTCxDQUFXLFFBQUEsR0FBVyxJQUF0QjtNQUNQLEtBQUEsR0FBUSxJQUFJLENBQUMsS0FBTCxDQUFXLENBQUMsUUFBQSxHQUFXLElBQVosQ0FBQSxHQUFvQixLQUEvQjtNQUNSLE9BQUEsR0FBVSxJQUFJLENBQUMsS0FBTCxDQUFXLENBQUMsUUFBQSxHQUFXLEtBQVosQ0FBQSxHQUFxQixPQUFoQztNQUNWLE9BQUEsR0FBVSxJQUFJLENBQUMsS0FBTCxDQUFXLENBQUMsUUFBQSxHQUFXLE9BQVosQ0FBQSxHQUF1QixPQUFsQzthQUNWLFFBQVEsQ0FBQyxTQUFULEdBQXFCLElBQUEsR0FBTyxPQUFQLEdBQWlCLEtBQWpCLEdBQXlCLE1BQXpCLEdBQWtDLE9BQWxDLEdBQTRDLE9BQTVDLEdBQXNELE9BQXRELEdBQWdFO0lBWHZFO1dBYWhCLEtBQUEsR0FBUSxXQUFBLENBQVksYUFBWixFQUEyQixJQUEzQjtFQXBCTzs7RUFzQmpCLGNBQUEsQ0FBZSxxQkFBZixFQUFzQyxXQUF0QztBQXRCQSIsInNvdXJjZXNDb250ZW50IjpbIkNvdW50RG93blRpbWVyID0gKGR0LCBpZCkgLT5cbiAgc2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZClcbiAgZW5kID0gbmV3IERhdGUoZHQpXG4gIF9zZWNvbmQgPSAxMDAwXG4gIF9taW51dGUgPSBfc2Vjb25kICogNjBcbiAgX2hvdXIgPSBfbWludXRlICogNjBcbiAgX2RheSA9IF9ob3VyICogMjRcbiAgc2hvd1JlbWFpbmluZyA9IC0+XG4gICAgbm93ID0gbmV3IERhdGUoKVxuICAgIGRpc3RhbmNlID0gZW5kIC0gbm93XG4gICAgaWYgZGlzdGFuY2UgPD0gMFxuICAgICAgY2xlYXJJbnRlcnZhbCB0aW1lclxuICAgICAgc2VsZWN0b3IuaW5uZXJIVE1MID0gXCJOb3chXCJcbiAgICAgIHJldHVyblxuICAgIGRheXMgPSBNYXRoLmZsb29yKGRpc3RhbmNlIC8gX2RheSlcbiAgICBob3VycyA9IE1hdGguZmxvb3IoKGRpc3RhbmNlICUgX2RheSkgLyBfaG91cilcbiAgICBtaW51dGVzID0gTWF0aC5mbG9vcigoZGlzdGFuY2UgJSBfaG91cikgLyBfbWludXRlKVxuICAgIHNlY29uZHMgPSBNYXRoLmZsb29yKChkaXN0YW5jZSAlIF9taW51dGUpIC8gX3NlY29uZClcbiAgICBzZWxlY3Rvci5pbm5lckhUTUwgPSBkYXlzICsgXCJkYXlzIFwiICsgaG91cnMgKyBcImhycyBcIiArIG1pbnV0ZXMgKyBcIm1pbnMgXCIgKyBzZWNvbmRzICsgXCJzZWNzXCJcblxuICB0aW1lciA9IHNldEludGVydmFsIHNob3dSZW1haW5pbmcsIDEwMDBcbiAgXG5Db3VudERvd25UaW1lciBcIjAxLzAxLzIwMTkgMDA6MDAgQU1cIiwgXCJjb3VudGRvd25cIiJdfQ==
//# sourceURL=coffeescript
(function() {
  var CountDownTimer;

  CountDownTimer = function(dt, id) {
    var _day, _hour, _minute, _second, end, selector, showRemaining, timer;
    selector = document.getElementById(id);
    end = new Date(dt);
    _second = 1000;
    _minute = _second * 60;
    _hour = _minute * 60;
    _day = _hour * 24;
    showRemaining = function() {
      var days, distance, hours, minutes, now, seconds;
      now = new Date();
      distance = end - now;
      if (distance <= 0) {
        clearInterval(timer);
        selector.innerHTML = "год";
        return;
      }
      days = Math.floor(distance / _day);
      hours = Math.floor((distance % _day) / _hour);
      minutes = Math.floor((distance % _hour) / _minute);
      seconds = Math.floor((distance % _minute) / _second);
      // return selector.innerHTML = days + "days " + hours + "hrs " + minutes + "mins " + seconds + "secs";
      return selector.innerHTML = days + " дн";
    };
    return timer = setInterval(showRemaining, 1000);
  };

  CountDownTimer("07/21/2018 09:00", "countdownKLG");

}).call(this);