//json Data Object
let json = [
    {
    "denominator": 86244,
    "id": "45069F",
    "name": "Brooke Army Medical Center  (FT Sam Houston)",
    "numerator": 73,
    "pct_infections": 0.08
    },
    {
    "denominator": 72859,
    "id": "450023",
    "name": "CITIZENS MEDICAL CENTER",
    "numerator": 53,
    "pct_infections": 0.07
    },
    {
    "denominator": 72672,
    "id": "450147",
    "name": "DE TAR HOSPITAL NAVARRO",
    "numerator": 43,
    "pct_infections": 0.06
    },
    {
    "denominator": 67728,
    "id": "450128",
    "name": "KNAPP MEDICAL CENTER",
    "numerator": 38,
    "pct_infections": 0.06
    },
    {
    "denominator": 489487,
    "id": "450015",
    "name": "PARKLAND HEALTH & HOSPITAL SYSTEM",
    "numerator": 270,
    "pct_infections": 0.06
    },
    {
    "denominator": 162414,
    "id": "450723",
    "name": "METHODIST CHARLTON MEDICAL CENTER",
    "numerator": 80,
    "pct_infections": 0.05
    },
    {
    "denominator": 595043,
    "id": "450358",
    "name": "HOUSTON METHODIST HOSPITAL",
    "numerator": 277,
    "pct_infections": 0.05
    },
    {
    "denominator": 47393,
    "id": "450347",
    "name": "HUNTSVILLE MEMORIAL HOSPITAL",
    "numerator": 26,
    "pct_infections": 0.05
    },
    {
    "denominator": 55646,
    "id": "450271",
    "name": "WISE REGIONAL HEALTH SYSTEM",
    "numerator": 27,
    "pct_infections": 0.05
    },
    {
    "denominator": 159416,
    "id": "450237",
    "name": "CHRISTUS SANTA ROSA MEDICAL CENTER",
    "numerator": 72,
    "pct_infections": 0.05
    }
]

/////////////////////////////////////
// Assign values for x and y axis
var chartLabels = [];
for (var i=0; i<json.length; i++) {
    chartLabels.push(json[i].id);
}

var chartData = [];
for (var i=0; i<json.length; i++) {
    chartData.push(json[i].pct_infections);
}

// Bar Chart Config
const myData = {
    labels: chartLabels,
    datasets: [{
        label: 'Infection Percent',
        data: chartData,
        backgroundColor: [
            'rgba(255, 99, 71, 0.2)',
            'rgba(255, 99, 71, 0.25)',
            'rgba(255, 99, 71, 0.30)',
            'rgba(255, 99, 71, 0.35)',
            'rgba(255, 99, 71, 0.40)',
            'rgba(255, 99, 71, 0.45)',
            'rgba(255, 99, 71, 0.50)',
            'rgba(255, 99, 71, 0.55)',
            'rgba(255, 99, 71, 0.60)',
            'rgba(255, 99, 71, 0.65)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
    }]
}


const tooltipTitle = (tooltipItems) => {
    let hospitalName = '';  
    tooltipItems.forEach(function(tooltipItem) {
        if(tooltipItem.parsed.x == '0')
            hospitalName = 'Brooke Army Medical Center  (FT Sam Houston)'
        if(tooltipItem.parsed.x == '1')
            hospitalName = 'Citizens Medical Center'
        if(tooltipItem.parsed.x == '2')
            hospitalName = 'De Tar Hospital Navarro'
        if(tooltipItem.parsed.x == '3')
            hospitalName = 'Knapp Medical Center'
        if(tooltipItem.parsed.x == '4')
            hospitalName = 'Parkland Health & Hospital System'
        if(tooltipItem.parsed.x == '5')
            hospitalName = 'Methodist Charlton Medical Center'
        if(tooltipItem.parsed.x == '6')
            hospitalName = 'Houston Methodist Hospital'
        if(tooltipItem.parsed.x == '7')
            hospitalName = 'Huntsville Memorial Hospital'
        if(tooltipItem.parsed.x == '8')
            hospitalName = 'Wise Regional Health System'
        if(tooltipItem.parsed.x == '9')
            hospitalName = 'Christus Santa Rosa Medical Center'
    });
    return hospitalName;
};

const tooltipBeforeBody = (tooltipItems) => {
    let hospitalDenominator = '';  
    tooltipItems.forEach(function(tooltipItem) {
        if(tooltipItem.parsed.x == '0')
            hospitalDenominator = '86,244'
        if(tooltipItem.parsed.x == '1')
            hospitalDenominator = '72,859'
        if(tooltipItem.parsed.x == '2')
            hospitalDenominator = '72,672'
        if(tooltipItem.parsed.x == '3')
            hospitalDenominator = '67,728'
        if(tooltipItem.parsed.x == '4')
            hospitalDenominator = '489,487'
        if(tooltipItem.parsed.x == '5')
            hospitalDenominator = '162,414'
        if(tooltipItem.parsed.x == '6')
            hospitalDenominator = '595,043'
        if(tooltipItem.parsed.x == '7')
            hospitalDenominator = '47,393'
        if(tooltipItem.parsed.x == '8')
            hospitalDenominator = '55,646'
        if(tooltipItem.parsed.x == '9')
            hospitalDenominator = '159,416'
    });
    return 'Denominator: ' + hospitalDenominator;
};

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: myData,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Infection Percent (%)'
                }   
            },
            x: {
                grid: {
                    display: false
                }  ,
                title: {
                    display: true,
                    text: 'Hospital ID'
                } 
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Highest Rates of Infection',
                padding: {
                    top: 10,
                    bottom: 30
                }
            },
            tooltip: {
                callbacks: {
                    title: tooltipTitle,
                    beforeBody: tooltipBeforeBody,
                    // afterBody, beforeFooter, footer, afterFooter -- options for other tooltips
                }
            }
        },
    }
});