/*
    app.js
    our application code

    Alternative fuel locations in Chicago dataset:
    https://data.cityofchicago.org/resource/alternative-fuel-locations.json

    Chicago coordinates:
    lat: 41.8369
    lng: -87.6847
 */

"use strict";

$(document).ready(function() {
   var mapElem = document.getElementById('map');
   var center = {
       lat: 41.8369,
       lng: -87.6847
   };

    var map = new google.maps.Map(mapElem, {
        center: center,
        zoom: 12
    });

    var infoWindow = new google.maps.InfoWindow();

    var stations;
    var markers = [];

    $.getJSON('https://data.cityofchicago.org/resource/alternative-fuel-locations.json')
        .done(function(data) {
            stations = data;

            data.forEach(function(station, itemIndex) { //adding item index?
                var marker = new google.maps.Marker({
                   position: {
                       lat: Number(station.location.latitude),
                       lng: Number(station.location.longitude)
                   },
                   map: map
                });
                markers.push(marker);

                google.maps.event.addListener(marker, 'click', function() {
                    var html = '<h2>' + station.station_name + '</h2>';
                    html+='<p>' + station.street_address + '</p>';

                    infoWindow.setContent(html);
                    infoWindow.open(map, this);
                });
            });
        })
        .fail(function(error) {
            console.log(error)
        })
        .always(function() {
           $('#ajax-loader').fadeOut();
        });

});

/*
javascript
every object in the dataset, has an object, string camerallabel
iterate over the array .for each
is this substring in this string?? .index of
casing: move both string to lowercase, and campare

traffic map: camera and marker
if camera does not qualify, remove the marker (which is a different array)
can remove the marker by (index, associated markers has the same index)
if on index 5 of the station array, then remove index 5 of the marker array

itteating camera array
if qualify(match search), leave alone
if not, set corresponding = null
itemIndex

keyUp
Search :bind

*/
