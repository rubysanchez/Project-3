// Create a map object.
var myMap = L.map("map", {
   center: [37.09, -95.71],
  zoom: 4
  
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// save a reference to the selected city

d3.select("#hospitalselect").on("change",change);

function change(){
  hospital = this.options[this.selectedIndex].value

  infectionObject = data.filter(item => item.name === hospital)

  L.marker([infectionObject.latitude,infectionObject.longitude],{  

  }).bindPopup(`${infectionObject.name}<hr>${infectionObject["hai pct"]}`).addTo(myMap);


}

