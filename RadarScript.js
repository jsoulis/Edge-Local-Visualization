var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
};
var color = Chart.helpers.color;
var config = {
    type: 'radar',
    data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
        datasets: [{
            label: 'Input',
            backgroundColor: color(window.chartColors.red).alpha(0.2).rgbString(),
            borderColor: window.chartColors.red,
            pointBackgroundColor: window.chartColors.red,
            data: [
                0,
                1,
                1,
                1,
                0,
                1,
                0
            ]
        }, {
            label: 'Output',
            backgroundColor: color(window.chartColors.blue).alpha(0.2).rgbString(),
            borderColor: window.chartColors.blue,
            pointBackgroundColor: window.chartColors.blue,
            data: [
                1,
                0,
                0,
                0,
                1,
                0,
                1
            ]
        }]
    },
    options: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Radar Chart'
        },
        scale: {
            ticks: {
                beginAtZero: true,
                stepSize: 1,
                min: -1,
                max: 1
            }
        }
    }
};
window.onload = function() {
    window.myRadar = new Chart(document.getElementById('canvas'), config);
};
