'use strict';
var Chart = require('adv-chart');
//main entry point
$(function(){
  var advChart = new Chart();
  advChart.registerComponent();
  advChart.activateComponent();
  console.log('app started');
});