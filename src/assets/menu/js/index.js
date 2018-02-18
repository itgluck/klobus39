// v3.1.0
//Docs at http://simpleweatherjs.com
$(document).ready(function() {
    getWeather(); //Get the initial weather.
    setInterval(getWeather, 10000); //Update the weather every 10 minutes.
});

function getWeather() {
    $.simpleWeather({
        location: 'Kaliningrad',
        // woeid: '',
        unit: 'c',
        success: function(weather) {
            html = '<h2><i class="icon-' + weather.code + '"></i> ' + weather.temp + '&deg;' + weather.units.temp + '</h2>';

            $("#weather").html(html);
        },
        error: function(error) {
            $("#weather").html('<p>' + error + '</p>');
        }
    });
}