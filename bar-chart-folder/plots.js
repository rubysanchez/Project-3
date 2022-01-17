console.log(data);

let top10hospitals = data

// Trace for the Top 10 Hospital Data
let trace1 = {
  x: top10hospitals.map(row => row.name),
  y: top10hospitals.map(row => row.pct_infections),
  type: "bar",
  label: "label"
};

// Data trace array
let traceData = [trace1];

// Apply title to the layout
let layout = {
  title: "Highest Rate of Infection"
  
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", traceData, layout);