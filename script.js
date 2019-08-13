console.log("Hello world")

async function myfetch() {
    let response = await fetch("url")
    return await response.json();
}

function generateData() {
    let data = [];
    myfetch().then((res) => {
        let element = {
            t: res.timestamp,
            y: res.value
        }
        data.push(element);
    })
}
/* function generateData() {
    var unit = document.getElementById('unit').value;
    function unitLessThanDay() {
        return unit === 'second' || unit === 'minute' || unit === 'hour';
    }
    function beforeNineThirty(date) {
        return date.hour() < 9 || (date.hour() === 9 && date.minute() < 30);
    }
    // Returns true if outside 9:30am-4pm on a weekday
    function outsideMarketHours(date) {
        if (date.isoWeekday() > 5) {
            return true;
        }
        if (unitLessThanDay() && (beforeNineThirty(date) || date.hour() > 16)) {
            return true;
        }
        return false;
    }
    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    function randomBar(date, lastClose) {
        var open = randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
        var close = randomNumber(open * 0.95, open * 1.05).toFixed(2);
        return {
            t: date.valueOf(),
            y: close
        };
    }
    var date = moment('Jan 01 1990', 'MMM DD YYYY');
    var now = moment();
    var data = [];
    var lessThanDay = unitLessThanDay();
    for (; data.length < 60 && date.isBefore(now); date = date.clone().add(1, unit).startOf(unit)) {
        if (outsideMarketHours(date)) {
            if (!lessThanDay || !beforeNineThirty(date)) {
                date = date.clone().add(date.isoWeekday() >= 5 ? 8 - date.isoWeekday() : 1, 'day');
            }
            if (lessThanDay) {
                date = date.hour(9).minute(30).second(0);
            }
        }
        data.push(randomBar(date, data.length > 0 ? data[data.length - 1].y : 30));
    }
    console.log(data);
    return data;
} */
var ctx = document.getElementById('chart1').getContext('2d');
ctx.canvas.width = 1000;
ctx.canvas.height = 300;
var color = Chart.helpers.color;
var cfg = {
    type: 'bar',
    data: {
        datasets: [{
            label: 'CHRT - Chart.js Corporation',
            backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
            borderColor: window.chartColors.red,
            data: generateData(),
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
};
var chart = new Chart(ctx, cfg);
document.getElementById('update').addEventListener('click', function() {
    var type = document.getElementById('type').value;
    var dataset = chart.config.data.datasets[0];
    dataset.type = type;
    dataset.data = generateData();
    chart.update();
});