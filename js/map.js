var baselayers, ways, nodes, controls_layers, mymap, overlays, mapbox, featureCount;

var mapbox = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,    
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicG5vbGwiLCJhIjoiY2pkNDNyNmtzMHRtOTMzcWZ0Y2szdzh3eCJ9.g8tszbsYH0bVCcj7v8RAEQ'
});
var baselayers = {
    "Mapbox": mapbox
}
var mymap = L.map('map', {
    center: [47.810, -122.384],
    zoom: 9,
    layers: [mapbox]
}); 


$.getJSON('edits.geojson',function (data) {
    var ways = L.geoJSON(data,{
    style: function (feature) {
        return {};
    }
    ,
    pointToLayer: function (feature) {
    	return false;
    }
    });
    var nodes = L.geoJSON(data,{
    style: function (feature) {
        return {stroke:false,fill:false};
    }
    });
    ways.addTo(mymap);
    nodes.addTo(mymap);
    var overlays = {
    "nodes": nodes,
    "ways": ways
    };
    featureCount = data.features.length.toString();
    var controls_layers = L.control.layers(baselayers, overlays);
    controls_layers.addTo(mymap);
    legend.addTo(mymap);
    counter.addTo(mymap);
});

var legend = L.control({position: 'bottomright'});
legend.onAdd = function (mymap) {
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML = 'OSM Last Touched Edits';
    return div;
};

var counter = L.control({position: 'bottomright'});
counter.onAdd = function(mymap) {
    var divCounter = L.DomUtil.create('div', 'counter');
    divCounter.innerHTML = 'Features: '+featureCount;
    return divCounter;
};