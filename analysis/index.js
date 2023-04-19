$("#hamburger-btn").on('click', function (e) {
    e.preventDefault();
    $(this).closest('.flex-side').toggleClass('collapsed');
    console.log($(this).closest('.flex-side'));
});

// $(".knob").knob();

// jQuery Flot Chart
var visits = [[1, 50], [2, 40], [3, 45], [4, 23], [5, 55], [6, 65], [7, 61], [8, 70], [9, 65], [10, 75], [11, 57], [12, 59]];
var visitors = [[1, 25], [2, 50], [3, 23], [4, 48], [5, 38], [6, 40], [7, 47], [8, 55], [9, 43], [10, 50], [11, 47], [12, 39]];
var bigChartOptions = {
    series: {
        lines: {
            show: true,
            lineWidth: 1,
            fill: true,
            fillColor: { colors: [{ opacity: 0.1 }, { opacity: 0.13 }] }
        },
        points: {
            show: true,
            lineWidth: 2,
            radius: 3
        },
        shadowSize: 0,
        stack: true
    },
    grid: {
        hoverable: true,
        clickable: true,
        tickColor: "#f9f9f9",
        borderWidth: 0
    },
    legend: {
        labelBoxBorderColor: "#fff"
    },
    colors: ["#30a0eb"],
    xaxis: {
        ticks: [[1, "JAN"], [2, "FEB"], [3, "MAR"], [4, "APR"], [5, "MAY"], [6, "JUN"],
        [7, "JUL"], [8, "AUG"], [9, "SEP"], [10, "OCT"], [11, "NOV"], [12, "DEC"]],
        font: {
            size: 10,
            family: "Open Sans, Arial",
            variant: "small-caps",
            color: "#697695"
        }
    },
    yaxis: {
        ticks: 3,
        tickDecimals: 0,
        font: { size: 10, color: "#9da3a9" }
    }
}

var smallChartOptions = {
    series: {
        lines: {
            show: true,
            lineWidth: 1,
            fill: true,
            fillColor: { colors: [{ opacity: 0.1 }, { opacity: 0.13 }] }
        },
        points: { show: false },
        shadowSize: 0
    },
    xaxis: {
        show: false
    },
    yaxis: {
        show: false
    },
    colors: ["#30a0eb"],
    grid: { borderWidth: 0 },
};

var plot1 = $.plot($("#IQ-interaction .flot-placeholder"),
    [visits], bigChartOptions);

var plot2 = $.plot($("#virtual-agent .flot-placeholder"),
    [visitors], bigChartOptions);
var plot3 = $.plot($("#drop-off-rate"), [visitors], smallChartOptions);
var plot4 = $.plot($("#handover-rate"), [visits], smallChartOptions);
$('#successful-interaction-chart').easyPieChart({
    barColor: '#4DCD80',
    trackColor: '#D6DBDF',
    scaleLength: 0,
    size: 80,
    lineWidth: 5
});

$('#satisfaction-chart').easyPieChart({
    barColor: '#00B74A',
    trackColor: '#D6DBDF',
    scaleLength: 0,
    size: 200,
    lineWidth: 10
});




