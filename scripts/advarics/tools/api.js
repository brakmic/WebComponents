/* a simple API to get some demo data for charts */
'use strict';
function API(){

}

var getDataBar = function() {
  return {
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
          },
    chartType: 'Bar'
  };
};

var getDataLine = function(){
  return {
      data:  {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
              datasets: [
                  {
                      label: "My First dataset",
                      fillColor: "rgba(220,220,220,0.2)",
                      strokeColor: "rgba(220,220,220,1)",
                      pointColor: "rgba(220,220,220,1)",
                      pointStrokeColor: "#fff",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(220,220,220,1)",
                      data: [65, 59, 80, 81, 56, 55, 40]
                  },
                  {
                      label: "My Second dataset",
                      fillColor: "rgba(151,187,205,0.2)",
                      strokeColor: "rgba(151,187,205,1)",
                      pointColor: "rgba(151,187,205,1)",
                      pointStrokeColor: "#fff",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(151,187,205,1)",
                      data: [28, 48, 40, 19, 86, 27, 90]
                  }
              ]
          },
          chartType: 'Line'
      };
};

var getDataPie = function(){
    var pieData = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    }
  ];

  var pieOptions = {
    segmentShowStroke : false,
    animateScale : true
  };

  return {
    chartType: 'Pie',
    data: pieData,
    pieExtra: pieOptions
  };

};

API.prototype.getChartOptions = function(){
  /* prepare data */
  var pieData  = getDataPie();
  var barData  = getDataBar();
  var lineData = getDataLine();

  var pieOptions  = {
    data      : pieData.data,
    chartType : pieData.chartType,
    contextOptions: {
      pieOptions : pieData.pieExtra
    }
  };
  var barOptions = {
    data      : barData.data,
    chartType : barData.chartType,
  };
  var lineOptions = {
    data      : lineData.data,
    chartType : lineData.chartType,
  };

  return {

      models: [
              {
                name: 'Pie Chart',
                options: pieOptions
              },
              {
                name: 'Line Chart',
                options: lineOptions
              },
              {
                name: 'Bar Chart',
                options: barOptions
              }
          ]
    };
};

module.exports = API;