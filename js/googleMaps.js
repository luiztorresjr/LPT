function initMap() {    
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var latlng = new google.maps.LatLng(-22.862983, -47.204202); 
    var options = {
        zoom: 12,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('map'), options);
    directionsRenderer.setMap(map);
    var infoWindow = new google.maps.InfoWindow;

    downloadUrl('../php/pontos.php', function(data){
        var xml = data.responseXML;
        var markers = xml.documentElement.getElementsByTagName('marker');
        Array.prototype.forEach.call(markers, function(markerElement){
            var name = markerElement.getAttribute('name');
            var address = markerElement.getAttribute('address');
            var point = new google.maps.LatLng(
                parseFloat(markerElement.getAttribute('lat')),
                parseFloat(markerElement.getAttribute('lng')));
            var infowincontent = document.createElement('div');
            var strong = document.createElement('strong');
            strong.textContent = name
            infowincontent.appendChild(strong);
            infowincontent.appendChild(document.createElement('br'));
            var markerImage = '../images/map_icon.png';
            var text = document.createElement('text');
            text.textContent = address
            infowincontent.appendChild(text);          
            var marker = new google.maps.Marker({
                position: point,
                map: map,
                icon: markerImage
            });
            
            marker.addListener('click', function(){
                infoWindow.setContent(infowincontent);
                infoWindow.open(map, marker); 
                calcularota(marker.position, map); 
            });                        
                   
        });
    });
        
}
var placeSearch, autocomplete;

var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};


function carregarNoMapa(){
    var autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('campo')),
        {types: ['geocode']});
        autocomplete.setFields(['address_component']);
        autocomplete.addListener('place_changed', addlatlong);
}

function addlatlong() {

var place = autocomplete.getPlace();

var latitude = place.geometry.location.lat();
var longitude = place.geometry.location.lng();

document.getElementById("latitude").value = latitude;
document.getElementById("longitude").value = longitude;
}

function calcularota(localiza, map) {
    var directionsService = new google.maps.DirectionsService();   
    $( "#busca" ).click(function() {
    if($(this).val() != ""){
        var endereco = new google.maps.LatLng($('#latitude').val(),$('#longitude').val())
        console.log(endereco);
        var fim = localiza;
        var resposta = {
        origin: endereco,
        destination: fim,
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC
    };
    }        
    directionsService.route(resposta, function(response, status){
          if (status == google.maps.DirectionsStatus.OK)
          {
            new google.maps.DirectionsRenderer({
              map: map,
              directions: response
            });
          }
          else
            $("#error").append("Unable to retrieve your route<br />");
        });
});

$("#local").click(function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          endereco =  new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
          console.log(endereco);
          var fim = localiza;
          var resposta = {
              origin: endereco,
              destination: fim,
              travelMode: 'DRIVING',
              unitSystem: google.maps.UnitSystem.METRIC
          };              
          directionsService.route(
            resposta,
            function(response, status)
            {
              if (status == google.maps.DirectionsStatus.OK)
              {
                new google.maps.DirectionsRenderer({
                  map: map,
                  directions: response
                });
              }
              else
                $("#error").append("Unable to retrieve your route<br />");
            }
          );
});

    }
});    
}
function downloadUrl(url, callback) {
        var request = window.ActiveXObject ?
            new ActiveXObject('Microsoft.XMLHTTP') :
            new XMLHttpRequest;

        request.onreadystatechange = function() {
          if (request.readyState == 4) {
            request.onreadystatechange = doNothing;
            callback(request, request.status);
          }
        };

        request.open('GET', url, true);
        request.send(null);
      }

      function doNothing() {}
 
      
/*
By https://tableless.com.br/api-google-maps-v3/?utm_source=tablelessRelatedLink
*/
function loadScript(){

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAIMLIjPd7Zzcs33jQO1XdGL0-PDXjir8M&libraries=places&callback=initMap';
    document.body.appendChild(script);
}

    
/*
-----------------------------------------------------------------------------------
*/

window.onload = loadScript()