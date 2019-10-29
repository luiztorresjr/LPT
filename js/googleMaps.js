<<<<<<< HEAD
function initMap() {    
        
        var directionsRenderer = new google.maps.DirectionsRenderer();

    var latlng = new google.maps.LatLng(-22.862983, -47.204202); 
=======
function initMap() {
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var latlng = new google.maps.LatLng(-22.862983, -47.204202);
 
>>>>>>> c28f779c9394b6722e328baf9a8f0473445cc960
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
<<<<<<< HEAD
            infowincontent.appendChild(text);          
=======
            infowincontent.appendChild(text);
            calcularota(marker, map);              
>>>>>>> c28f779c9394b6722e328baf9a8f0473445cc960
            var marker = new google.maps.Marker({
                position: point,
                map: map,
                icon: markerImage
            });
            
            marker.addListener('click', function(){
                infoWindow.setContent(infowincontent);
<<<<<<< HEAD
                infoWindow.open(map, marker); 
                calcularota(marker.position, map); 
            });                        
                   
        });
    });
    
=======
                infoWindow.open(map, marker);    
            });                        
        
        });
    });
    var directionsService = new google.maps.DirectionsService();
    function calcularota() {

    $( "#busca" ).click(function() {
        if($(this).val() != "")
            var endereco = carregarNoMapa($("#campo").val());
            console.log(endereco);
        var fim = marker
        var resposta = {
            origin: endereco,
            destination: fim,
            travelMode: 'Walking'
        };
        directionsService.route(resposta, function(result, status){
                if(status == 'OK'){
                    DirectionsRenderer.setDirections(result);
                }
        });
    });
    
    $("#local").click(function(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              endereco = new google.maps.LatLng(pos.lat, pos.lng)
              var fim = marker
              var resposta = {
                  origin: endereco,
                  destination: fim,
                  travelMode: 'Walking'
              };
              
              directionsService.route(resposta, function(result, status){
                      if(status == 'OK'){
                          DirectionsRenderer.setDirections(result);
                      }
        
              });
    });

        }
    });    }
    
}
function carregarNoMapa(){
    var geocoder = new google.maps.Geocoder();
    $("#campo").autocomplete({
        source: function (request, response) {
            geocoder.geocode({ 'address': request.term + ', Brasil', 'region': 'BR' }, function (results, status) {
                response($.map(results, function (item) {
                    return {
                        latitude: item.geometry.location.lat(),
                        longitude: item.geometry.location.lng()
                    }
                }));
            })
        }
    });
>>>>>>> c28f779c9394b6722e328baf9a8f0473445cc960
}

function calcularota(localiza, map) {
    var input = $("#campo").val();
    var endereco = new google.maps.places.SearchBox(input);
    var directionsService = new google.maps.DirectionsService();   
    $( "#busca" ).click(function() {
    if($(this).val() != "")
    var fim = localiza;
    var resposta = {
        origin: endereco,
        destination: fim,
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC
    };
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
    script.src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAIMLIjPd7Zzcs33jQO1XdGL0-PDXjir8M&callback=initMap';
    document.body.appendChild(script);
}

    
/*
-----------------------------------------------------------------------------------
*/

window.onload = loadScript()