// data for the map markers

var hospitals = [{
  "city": "THE WOODLANDS",
  "denominator": 100254,
  "id": "670122",
  "lat": 30.1877,
  "lng": -95.4288,
  "name": "HOUSTON METHODIST THE WOODLANDS HOSPITAL",
  "numerator": 6,
  "pct_infections": "0.01%",
  "state": "TX"
}, {
  "city": "EL PASO",
  "denominator": 60124,
  "id": "670120",
  "lat": 31.8925,
  "lng": -106.5426,
  "name": "THE HOSPITALS OF PROVIDENCE TRANSMOUNTAIN CAMPUS",
  "numerator": 14,
  "pct_infections": "0.02%",
  "state": "TX"
}, {
  "city": "PEARLAND",
  "denominator": 38982,
  "id": "670106",
  "lat": 29.5405,
  "lng": -95.3208,
  "name": "HCA HOUSTON HEALTHCARE PEARLAND",
  "numerator": 13,
  "pct_infections": "0.03%",
  "state": "TX"
}, {
  "city": "FORT WORTH",
  "denominator": 33977,
  "id": "670103",
  "lat": 32.9448,
  "lng": -97.3124,
  "name": "MEDICAL CITY ALLIANCE",
  "numerator": 10,
  "pct_infections": "0.03%",
  "state": "TX"
}, {
  "city": "NEW BRAUNFELS",
  "denominator": 50465,
  "id": "670098",
  "lat": 29.7229,
  "lng": -98.0742,
  "name": "RESOLUTE HEALTH HOSPITAL",
  "numerator": 13,
  "pct_infections": "0.03%",
  "state": "TX"
}, {
  "city": "COLLEGE STATION",
  "denominator": 75425,
  "id": "670088",
  "lat": 30.5118,
  "lng": -96.3171,
  "name": "BAYLOR SCOTT & WHITE MEDICAL CENTER- COLLEGE STATI",
  "numerator": 24,
  "pct_infections": "0.03%",
  "state": "TX"
}, {
  "city": "FORT WORTH",
  "denominator": 59665,
  "id": "670085",
  "lat": 32.931,
  "lng": -97.2843,
  "name": "TEXAS HEALTH HARRIS METHODIST HOSPITAL ALLIANCE",
  "numerator": 5,
  "pct_infections": "0.01%",
  "state": "TX"
}, {
  "city": "MC KINNEY",
  "denominator": 94922,
  "id": "670082",
  "lat": 33.1976,
  "lng": -96.6153,
  "name": "BAYLOR SCOTT AND WHITE  MEDICAL CENTER  MCKINNEY",
  "numerator": 30,
  "pct_infections": "0.03%",
  "state": "TX"
}, {
  "city": "HARKER HEIGHTS",
  "denominator": 30404,
  "id": "670080",
  "lat": 31.0286,
  "lng": -97.6115,
  "name": "SETON MEDICAL CENTER HARKER HEIGHTS",
  "numerator": 4,
  "pct_infections": "0.01%",
  "state": "TX"
}, {
  "city": "HOUSTON",
  "denominator": 107190,
  "id": "670077",
  "lat": 29.7705,
  "lng": -95.7107,
  "name": "HOUSTON METHODIST WEST HOSPITAL",
  "numerator": 24,
  "pct_infections": "0.02%",
  "state": "TX"
}, {
  "city": "HOUSTON",
  "denominator": 44785,
  "id": "670075",
  "lat": 29.9781,
  "lng": -95.5803,
  "name": "ST LUKE'S HOSPITAL AT THE VINTAGE",
  "numerator": 7,
  "pct_infections": "0.02%",
  "state": "TX"
}, {
  "city": "FLOWER MOUND",
  "denominator": 51874,
  "id": "670068",
  "lat": 33.0383,
  "lng": -97.0745,
  "name": "TEXAS HEALTH PRESBYTERIAN HOSPITAL FLOWER MOUND",
  "numerator": 10,
  "pct_infections": "0.02%",
  "state": "TX"
}, {
  "city": "SUNNYVALE",
  "denominator": 47803,
  "id": "670060",
  "lat": 32.797,
  "lng": -96.5616,
  "name": "BAYLOR SCOTT AND WHITE MEDICAL CENTER SUNNYVALE",
  "numerator": 3,
  "pct_infections": "0.01%",
  "state": "TX"
}, {
  "city": "KYLE",
  "denominator": 96800,
  "id": "670056",
  "lat": 29.9966,
  "lng": -97.8335,
  "name": "ASCENSION  SETON HAYS",
  "numerator": 16,
  "pct_infections": "0.02%",
  "state": "TX"
}];


d3.json("/api/hospitaldata").then(function(json) {
  
  
// Create a map object.
var myMap = L.map("map", {
  center: [31.96, -99.90],
  zoom: 6

});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Looping through the hospital data JSON, create one marker for each hospital, bind a popup containing its name and percent infection, and add it to the map.
for (var i=0; i<json.length; i++) {
  var hospitaldata = json[i];
  L.marker([hospitaldata.lat, hospitaldata.lng]).bindPopup(`<h3>${hospitaldata.name}</h3> <hr> <h4>Percent Infection ${hospitaldata.pct_infections}</h4>`)
      .addTo(myMap);
};
});