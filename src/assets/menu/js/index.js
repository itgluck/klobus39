// v3.1.0
//Docs at http://simpleweatherjs.com
$(document).ready(function() {
<<<<<<< HEAD
    getWeather(); //Get the initial weather.
    setInterval(getWeather, 10000); //Update the weather every 10 minutes.
});

function getWeather() {
    $.simpleWeather({
        location: 'Kaliningrad',
        // woeid: '',
=======
    $.simpleWeather({
        location: 'Zarafshan',
        woeid: '',
>>>>>>> e77817d3f966049dbf4f08014d2c843a8e260cda
        unit: 'c',
        success: function(weather) {
            html = '<h2><i class="icon-' + weather.code + '"></i> ' + weather.temp + '&deg;' + weather.units.temp + '</h2>';

            $("#weather").html(html);
        },
        error: function(error) {
            $("#weather").html('<p>' + error + '</p>');
        }
    });
<<<<<<< HEAD
}
=======
});
>>>>>>> e77817d3f966049dbf4f08014d2c843a8e260cda
