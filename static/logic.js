// Creating map object
var myMap = L.map("map", {
    center: [19.538, -155.232],
    zoom: 3
  });
  
  var API_KEY = "pk.eyJ1Ijoic2hldHVzaGFybWExMyIsImEiOiJjanZwdWU0NTMyZGp3M3l1aXN3ZzJ4dHkyIn0.gL65qVMiYc_X51FbV4PKSA"
  
  // Adding tile layer to the map
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // URL
  
  url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"
  console.log(url)
  
  function Intense(magnitude) {
      if (magnitude >= 5) {
          return '#e6261f'
      } else if (magnitude >= 4) {
          return '#eb7532'
      } else if (magnitude >= 3) {
          return '#f7d038'
      } else if (magnitude >= 2) {
          return '#a3e048'
      } else if (magnitude >= 1) {
          return '#49da9a'
      } else {
          return '#34bbe6'
      }
  };
  
  //got code from this website: https://www.igismap.com/legend-in-leafletjs-map-with-topojson/
  function createledgend(){
    var legend = L.control({ position: 'bottomright' });
  
    legend.onAdd = function (map) {
    
        var div = L.DomUtil.create('div', 'info legend'),
            mag = [0, 1, 2, 3, 4, 5],
            labels = [];
    
        div.innerHTML += "<h4 style='margin:2px'>Magnitude</h4>"
    
        for (var i = 0; i < mag.length; i++) {
            div.innerHTML +=
                '<i style="background:' + Intense(mag[i]) + '"></i> ' +
                mag[i] + (mag[i + 1] ? '&ndash;' + mag[i + 1] + '<br>' : '+');
        }
    
        return div;
    };
    legend.addTo(myMap);
  }
  
  // Grab the data with d3
  d3.json(url, function(data) {
    // Creating a GeoJSON layer with the retrieved data, get code from this website: https://leafletjs.com/examples/geojson/
    console.log(data)
    L.geoJson(data,{
      pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, {radius: feature.properties.mag*1.5});
      },
      style: function (feature) {
        return {
            fillColor: Intense(feature.properties.mag),
            fillOpacity: 0.5,
            weight: 0.4,
            color: 'red'
  
        }
    },
  
    onEachFeature: function (feature, layer) {
        layer.bindPopup("<h5 style='text-align:center;'>" + Date(feature.properties.time) + "</h5> <hr> <h5 style='text-align:center;'>" + feature.properties.title + "</h5>")
  }
  }).addTo(myMap);
  
  createledgend(myMap);
  
  }); 
  
  