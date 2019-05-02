var basemap = 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}';
var attribution = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

var map = L.map('map', {
  center: [43.656730, -70.259570],
  zoom: 16,
  minZoom: 2,
  maxZoom: 18
});

L.tileLayer(basemap, {
    attribution: attribution,
    ext: 'png'
}).addTo(map);

/* Lit Buildings */
// create custom icon
var lightBulbIcon = new L.icon({
  iconUrl: 'images/lightbulb-regular.svg',
  iconSize: [30, 30]
});

function litBuildingsActions(feature, layer) {
  layer.bindPopup(
    "<h1>Maine Lit Buildings</h1>" +
    "<h2>County: " + feature.properties.COUNTY + "</h2>" +
    "<h2>Address:</h2>" +
    feature.properties.ADDRESS + "<br/>" +
    feature.properties.MUNICIPALI + ", " + 
    feature.properties.STATE + " " + feature.properties.ZIPCODE +
    "<h2>Lat/Long: </h2>" +
    feature.properties.LATITUDE + "<br/>" + 
    feature.properties.LONGITUDE
  );
  
  layer.setIcon(lightBulbIcon);
}

L.geoJson(maineLitBuildings, {
  onEachFeature: litBuildingsActions
}).addTo(map);

/* Cables */
// Color key by owner:
const colorKey = {
  "GWI": "red",
  "XO": "blue",
  "Zayo": "orange"
}

const defaultColor = "green";

// create custom icon
var cablesIcon = new L.icon({
  iconUrl: 'images/plug-solid.svg',
  iconSize: [30, 30]
});

function cableActions(feature, layer) {
  layer.bindPopup(
    "<h1>Maine Cables</h1>" +
    "<h2>Owner: " + feature.properties.OWNER + "</h2>" +
    "<h2>Length: </h2>" + feature.properties.LENGTH_MET + " m"
  );

  layer.setStyle(
    {color: colorKey[feature.properties.OWNER] || defaultColor}
  );
}

L.geoJson(maineCables, {
  onEachFeature: cableActions,
}).addTo(map);

// Legend:
var legend = L.control({
  position: 'topright'
});

legend.onAdd = function (map) { 
  var div = L.DomUtil.create('div', 'info legend');
  var colorKeys = Object.keys(colorKey);
  var colorValues = Object.values(colorKey);

  for (var i = 0; i < colorValues.length; i++) {
    div.innerHTML += '<i style="background:' + colorValues[i] + '"></i> ' + colorKeys[i] + '<br>';
  } 

  return div;
} 

legend.addTo(map);