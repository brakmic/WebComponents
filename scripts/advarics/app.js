'use strict';
var Chart = require('adv-chart');

function domLoaded(e) {
   var advChart = new Chart();
   advChart.registerComponent();
   advChart.activateComponent();
   console.log('app started');
}
document.addEventListener("DOMContentLoaded", domLoaded, false);