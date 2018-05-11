function loadMap(){
	map = new OpenLayers.Map("map");
	var lonLat = new OpenLayers.LonLat(-22.8722,-47.2010);
	var zoom = 11.8;
	map.addLayer(new OpenLayers.Layer.OSM());
	map.setCenter(lonLat, zoom);
	map.zoomToMaxExtent();
}