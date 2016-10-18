function mapRoute(start) {
  $.post("api/map.php",{start:start},function(data) {
    $("#map").html(data);
  });
}

function locate() {
  alert("a");
}

function initAutocomplete(){

  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete')),
    { types: ['geocode'] });
    // When the user selects an address from the dropdown,
    // populate the address fields in the form.
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace();
      //console.log(place);
      if (place.formatted_address) {
        var geo = {};
        var start = place.formatted_address;
        mapRoute(start);
      }else{
        alert("Try again !Please select the dropping address");
      }

    });
}

function LocateMe() {
  window.navigator.geolocation.getCurrentPosition(woSuccess,woError);
}

var woSuccess = function (postion) {
    var geo = {};
    geo.lat = postion.coords.latitude;
    geo.lng = postion.coords.longitude;
    var latlng = new google.maps.LatLng(geo.lat, geo.lng);
    new google.maps.Geocoder().geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var start = results[1].formatted_address;
        document.getElementById('autocomplete').value =start;
        mapRoute(start);
      }
    });
  };

var woError=function(error) {
    alert(error.message);
    console.log(error);
};

function initMap() {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    scrollwheel: false,
    zoom: 8
  });
}
