// NOTE: THIS IS WHAT MY MAP IS CALLED geoJayMap:
var geoJayMap = L.map('mapId').setView([34.1083,
          -117.28], 9);
// NOTE: intialize the map
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
              attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
              maxZoom: 18,
              id: 'mapbox.streets',
              accessToken: 'pk.eyJ1Ijoiam9ydGVnYWhvbWVzIiwiYSI6ImNqeWtsbXIwODBmcmczbW9iYTcycmUycXIifQ.YQcwA678CCL-sQwDDMh49g'
          }).addTo(geoJayMap);

// NOTE: Global variables
var geoJsonLayer; // NOTE: This is for the fetchMyData func.
var greenIcon =  L.icon({
  iconUrl: "media/green.png",
  iconSize:[20, 20]
})
var yellowIcon =  L.icon({
  iconUrl: "media/yellow.png",
  iconSize:[20, 20]
})
var orangeIcon =  L.icon({
  iconUrl: "media/orange.png",
  iconSize:[20, 20]
})
var redIcon =  L.icon({
  iconUrl: "media/red.png",
  iconSize:[20, 20]
})

// NOTE: End of global variables

// NOTE: Start of fetchMyData funciton
function fetchMyQuake() {   //start of fetchMyData bracket
  fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
  // NOTE: Start of case switching

  function switchIcons(features, latlng){   //start of main switch bracket
      switch(features.properties.alert) {
        case 'green':
        return L.marker(latlng, {
          icon: greenIcon
        })
      };
      switch(features.properties.alert) {
        case 'yellow':
        return L.marker(latlng, {
          icon: yellowIcon
        })
      };
      switch(features.properties.alert) {
        case 'orange':
        return L.marker(latlng, {
          icon: orangeIcon
        })
      };
      switch(features.properties.alert) {
        case 'red':
        return L.marker(latlng, {
          icon: redIcon
        })
      };
  }    //end of switch bracket

  // NOTE: Placing data on mapId
   geoJsonLayer = L.geoJSON(data, {
    pointToLayer: switchIcons,
    onEachFeature: function(features, geoJsonLayer){
      geoJsonLayer.bindPopup('<p><b>Magnitude: </b>' + features.properties.mag + '<br><b>Location: </b>' + features.properties.place + '<br><b> Alert: </b>' + features.properties.alert + '<br></p>');
    }
  })
})

}  //End of fetchMyData Bracket

fetchMyQuake();

// NOTE: DOM (link main.js to index.html)
const fetchButton = document.getElementById('fetchMyQuake');

// NOTE: Set Event Listener;
fetchButton.addEventListener('click',function(){
  if(fetchButton.checked === true){
    geoJsonLayer.addTo(geoJayMap);
  }else{
    geoJayMap.removeLayer(geoJsonLayer);
  }
})
// NOTE: End of Event Listener;
