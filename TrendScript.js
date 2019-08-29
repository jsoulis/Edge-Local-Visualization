async function myfetch() {
    //Outside web api call is made
    //let response = await fetch("http://localhost:5590/api/v1/tenants/default/namespaces/default/streams/OpcUa5.Sinusoid1/Data?startIndex=2019-08-11T13:00:00Z&count=100");
    //return await response.json();

    let response = await getFirstBulkData(20);
    return await response;
}

var ctx = document.getElementById('chart1').getContext('2d');
ctx.canvas.width = 1000;
ctx.canvas.height = 300;
var color = Chart.helpers.color;
var cfg = {
    type: 'bar',
    data: {
        datasets: [{
            label: 'Stream Name',
            backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
            borderColor: window.chartColors.red,
            data: [],
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'time',
                distribution: 'series',
                ticks: {
                    source: 'data',
                    autoSkip: true
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Closing price ($)'
                }
            }]
        },
        tooltips: {
            intersect: false,
            mode: 'index',
            callbacks: {
                label: function(tooltipItem, myData) {
                    var label = myData.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) {
                        label += ': ';
                    }
                    label += parseFloat(tooltipItem.value).toFixed(2);
                    return label;
                }
            }
        }
    }
}
var chart = new Chart(ctx, cfg);

async function formatData() {
    let formatData = [];
    let data = await myfetch();
    for(let i = 0; i < data.length; i++) {
        let item = {
            t: data[i].Timestamp,
            //t: Date.parse(data[i].Timestamp),
            y: data[i].Value
        };
        formatData.push(item);
    }
    return formatData;
}

const InitializeChart = (dataInput) => {
    var dataset = chart.config.data.datasets[0];
    dataset.data = dataInput;
    chart.update();
}

async function AsyncInitialize() {
    let data = await formatData();
    console.log(data)
    InitializeChart(data);
}

const formatDate = (data) => {
    let dataOutput = {
        t: data.Timestamp,
        y: data.Value
    }
    return dataOutput;
}
const updateChart = (dataInput) => {
    var data = chart.config.data.datasets[0].data;

    //may need to change this pop() to shift() and unshift() to push()... depends on the order of data received from API call.
    data.pop();
    data.unshift(formatDate(dataInput));

    console.log(data);
    chart.update();
}

async function asyncUpdate() {
    //will need to do something different here to periodically poll api last endpoint for stream.
    //will simulate this behavior in the following example.

    let dataUpdate = await getSimulatorData();
    updateChart(dataUpdate);
    setTimeout(asyncUpdate, 5000);
}

const fullChartUpdate = () => {
    //update entire graph at once.
    let data = chart.config.data.datasets[0].data;

}

AsyncInitialize();
asyncUpdate();


