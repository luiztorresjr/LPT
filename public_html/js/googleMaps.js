function initMap() {
    var latlng = new google.maps.LatLng(-22.862983, -47.204202);
 
    var options = {
        zoom: 12,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('map'), options);
    var infoWindow = new google.maps.InfoWindow;

    downloadUrl('../php/pontos.php', function(data){
        var xml = data.responseXML;
        var markers = xml.documentElement.getElementsByTagName('marker');
        Array.prototype.forEach.call(markers, function(markerElement){
            var name = markerElement.getAttribute('name');
            var address = markerElement.getAttribute('address');
            var type = markerElement.getAttribute('type');
            var point = new google.maps.LatLng(
                parseFloat(markerElement.getAttribute('lat')),
                parseFloat(markerElement.getAttribute('lng')));
            var infowincontent = document.createElement('div');
            var strong = document.createElement('strong');
            strong.textContent = name
            infowincontent.appendChild(strong);
            infowincontent.appendChild(document.createElement('br'));

            var text = document.createElement('text');
            text.textContent = address
            infowincontent.appendChild(text);
            var marker = new google.maps.Marker({
                map: map,
                position: point
            });
            marker.addListener('click', function(){
                infoWindow.setContent(infowincontent);
                infoWindow.open(map, marker);
            });
        });
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
function pesquisar(){
    
}
window.onload = loadScript;