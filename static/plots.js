// Create an array of each hospitals numbers
var us = Object.values(data.us);
var ak = Object.values(data.ak);
var al = Object.values(data.al);
//need to loop through values vs creating a variable for each


// Create an array of infections labels
var labels = Object.keys(data.us);

// Display the default plot
function init() {
  var data = [{
    values: us,
    labels: labels,
    type: "pie"
  }];

  var layout = {
    height: 600,
    width: 800
  };

  Plotly.newPlot("pie", data, layout);
}

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
  // Initialize an empty array for the hospitals's data
  var data = [];

  if (dataset == 'us') {                        //call d3.json data here
      data = us;
  }
  else if (dataset == 'ak') {
      data = ak;
  }
  else if (dataset == 'al') {
      data = al;
  }

  // Call function to update the chart
  updatePlotly(data);
}

// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("pie", "values", [newdata]);
}

init();




/*json Data Object
let jsData = [
        {
        "id": "670122",
        "name": "HOUSTON METHODIST THE WOODLANDS HOSPITAL",
        "pct_ab_hyst": "0.00%",
        "pct_cath_UTI": "0.02%",
        "pct_cdiff": "0.00%",
        "pct_cntrl_line": "0.00%",
        "pct_mrsa": "0.00%",
        "pct_ssi_colon": "0.49%",
        "state": "TX"
        },
        {
        "id": "670120",
        "name": "THE HOSPITALS OF PROVIDENCE TRANSMOUNTAIN CAMPUS",
        "pct_ab_hyst": "0.00%",
        "pct_cath_UTI": "0.07%",
        "pct_cdiff": "0.02%",
        "pct_cntrl_line": "0.18%",
        "pct_mrsa": "0.00%",
        "pct_ssi_colon": "0.00%",
        "state": "TX"
        },
        {
        "id": "670106",
        "name": "HCA HOUSTON HEALTHCARE PEARLAND",
        "pct_ab_hyst": "0.00%",
        "pct_cath_UTI": "0.09%",
        "pct_cdiff": "0.01%",
        "pct_cntrl_line": "0.37%",
        "pct_mrsa": "0.00%",
        "pct_ssi_colon": "0.00%",
        "state": "TX"
        },
        {
        "id": "670103",
        "name": "MEDICAL CITY ALLIANCE",
        "pct_ab_hyst": "3.51%",
        "pct_cath_UTI": "0.08%",
        "pct_cdiff": "0.01%",
        "pct_cntrl_line": "0.20%",
        "pct_mrsa": "0.00%",
        "pct_ssi_colon": "2.83%",
        "state": "TX"
        },
        {
        "id": "670098",
        "name": "RESOLUTE HEALTH HOSPITAL",
        "pct_ab_hyst": "0.00%",
        "pct_cath_UTI": "0.07%",
        "pct_cdiff": "0.04%",
        "pct_cntrl_line": "0.04%",
        "pct_mrsa": "0.00%",
        "pct_ssi_colon": "0.00%",
        "state": "TX"
        },
        {
        "id": "670088",
        "name": "BAYLOR SCOTT & WHITE MEDICAL CENTER- COLLEGE STATI",
        "pct_ab_hyst": "1.52%",
        "pct_cath_UTI": "0.08%",
        "pct_cdiff": "0.01%",
        "pct_cntrl_line": "0.16%",
        "pct_mrsa": "0.01%",
        "pct_ssi_colon": "3.92%",
        "state": "TX"
        },
        {
        "id": "670085",
        "name": "TEXAS HEALTH HARRIS METHODIST HOSPITAL ALLIANCE",
        "pct_ab_hyst": "1.28%",
        "pct_cath_UTI": "0.00%",
        "pct_cdiff": "0.00%",
        "pct_cntrl_line": "0.00%",
        "pct_mrsa": "0.00%",
        "pct_ssi_colon": "2.50%",
        "state": "TX"
        },
        {
        "id": "670082",
        "name": "BAYLOR SCOTT AND WHITE  MEDICAL CENTER  MCKINNEY",
        "pct_ab_hyst": "1.90%",
        "pct_cath_UTI": "0.06%",
        "pct_cdiff": "0.05%",
        "pct_cntrl_line": "0.06%",
        "pct_mrsa": "0.00%",
        "pct_ssi_colon": "2.14%",
        "state": "TX"
        },
        {
        "id": "670080",
        "name": "SETON MEDICAL CENTER HARKER HEIGHTS",
        "pct_ab_hyst": "3.85%",
        "pct_cath_UTI": "0.09%",
        "pct_cdiff": "0.01%",
        "pct_cntrl_line": "0.00%",
        "pct_mrsa": "0.00%",
        "pct_ssi_colon": "0.00%",
        "state": "TX"
        },
        {
        "id": "670077",
        "name": "HOUSTON METHODIST WEST HOSPITAL",
        "pct_ab_hyst": "0.65%",
        "pct_cath_UTI": "0.04%",
        "pct_cdiff": "0.02%",
        "pct_cntrl_line": "0.06%",
        "pct_mrsa": "0.01%",
        "pct_ssi_colon": "0.67%",
        "state": "TX"
        },
        {
        "id": "670075",
        "name": "ST LUKE'S HOSPITAL AT THE VINTAGE",
        "pct_ab_hyst": "0.00%",
        "pct_cath_UTI": "0.03%",
        "pct_cdiff": "0.02%",
        "pct_cntrl_line": "0.03%",
        "pct_mrsa": "0.00%",
        "pct_ssi_colon": "2.50%",
        "state": "TX"
        },
        {
        "id": "670068",
        "name": "TEXAS HEALTH PRESBYTERIAN HOSPITAL FLOWER MOUND",
        "pct_ab_hyst": "0.00%",
        "pct_cath_UTI": "0.03%",
        "pct_cdiff": "0.04%",
        "pct_cntrl_line": "0.00%",
        "pct_mrsa": "0.00%",
        "pct_ssi_colon": "0.00%",
        "state": "TX"
        },
        {
        "id": "670060",
        "name": "BAYLOR SCOTT AND WHITE MEDICAL CENTER SUNNYVALE",
        "pct_ab_hyst": "0.00%",
        "pct_cath_UTI": "0.00%",
        "pct_cdiff": "0.01%",
        "pct_cntrl_line": "0.00%",
        "pct_mrsa": "0.01%",
        "pct_ssi_colon": "1.67%",
        "state": "TX"
        },
        {
        "id": "670056",
        "name": "ASCENSION  SETON HAYS",
        "pct_ab_hyst": "0.00%",
        "pct_cath_UTI": "0.10%",
        "pct_cdiff": "0.03%",
        "pct_cntrl_line": "0.00%",
        "pct_mrsa": "0.00%",
        "pct_ssi_colon": "0.00%",
        "state": "TX"
        },
        {
        "id": "670055",
        "name": "METHODIST HOSPITAL  STONE OAK",
        "pct_ab_hyst": "1.03%",
        "pct_cath_UTI": "0.23%",
        "pct_cdiff": "0.02%",
        "pct_cntrl_line": "0.08%",
        "pct_mrsa": "0.00%",
        "pct_ssi_colon": "3.50%",
        "state": "TX"
        }
]
var dataPoints = [];
var chart = new CanvasJS.Chart("chartContainer", {
  title: {
    text: "Pie chart from JSON data"
  },
  data: [{
    type: "pie",
    toolTipContent: "{indexLabel}: {y}",
    dataPoints: dataPoints
  }]
});
function addData(data) {
  for(var i = 0; i < data.length; i++){
    for(var key in data[i]){
      if(!isNaN(data[i][key])){
        dataPoints.push({indexLabel: key, y: Number(data[i][key])});
      }
    }
  }
  chart.render();
}
$.getJSON("https://api.myjson.com/bins/1dxzog", addData);
*/