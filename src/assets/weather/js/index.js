// Docs at http://simpleweatherjs.com

/* Does your browser support geolocation? */
if ("geolocation" in navigator) {
    $('.js-geolocation').show();
} else {
    $('.js-geolocation').hide();
}

/* Where in the world are you? */
$('.js-geolocation').on('click', function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        loadWeather(position.coords.latitude + ',' + position.coords.longitude); //load weather using your lat/lng coordinates
    });
});

/* 
 * Test Locations
 * Austin lat/long: 30.2676,-97.74298
 * Austin WOEID: 2357536
 */
$(document).ready(function() {
    loadWeather('Kaliningrad', ''); //@params location, woeid
});

function loadWeather(location, woeid) {
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: 'C',
        success: function(weather) {
            html = '<div class="city">' + weather.city + '</div>';
            // html += '<h2>' + weather.temp + '&deg;' + weather.units.temp + '<i class="icon-' + weather.code + '"></i> </h2>';
            html += '<h2><i class="icon-' + weather.code + '"></i>' + weather.temp + '&deg;' + weather.units.temp + '</h2>';

            html += '<ul><li>↑ ' + weather.high + '&deg; ' + weather.units.temp + '</li> / <li>↓ ' + weather.low + '&deg; ' + weather.units.temp + '</li><li>Влажность: ' + weather.humidity + '</li> </ul><hr style="width:60%;">';

            for (var i = 0; i < 6; i++) {
                html += '<div class="data"><li class="week">' + weather.forecast[i].date + '<i class="icon-' + weather.forecast[i].code + '"></i>' + weather.forecast[i].high + '&deg; ' + weather.units.temp + '</li></div>';

                // html += '<div class="week">' + '<i class="icon-' + weather.forecast[i].code + '"></i><h3>' + weather.forecast[i].high + '</h3><br>' + weather.forecast[i].date + '</div>';
            }
            $("#weather").html(html);
        },
        error: function(error) {
            $("#weather").html('<p>' + error + '</p>');
        }
    });
}