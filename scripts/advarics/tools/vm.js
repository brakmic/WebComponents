/* for creation of view models */
'use strict';
var UI = require('ui');
var API   = require('api');

function ViewModel(){
}
//get VM for chart component
function ChartVM(){
  this.UI = new UI();
  this.API = new API();
  var that = this;
  this.tabs = [
        {
            text: "User",
            icon: "user",
            content: "User tab",
        },
        {
            text: "Comment",
            icon: "comment",
            content: "Comment tab",
        },
        {
            text: "Find",
            icon: "find",
            content: "Find tab"
        }
    ];
    this.onItemRendered = function (e) {
      console.log('onItemRendered');
    };
    this.onItemClick = function(){
      console.log('onItemClick');
    };
    this.onSelectionChanged = function(e){
      console.log('onSelectionChanged');
    };
    this.onContentReady = function(e){
    };
    this.selectedTab = ko.observable(0);
    this.tabContent = ko.computed(function () {
      return this.tabs[this.selectedTab()].content;
    }, this);
    //here we create new charts when user clicks on tab
    this.selectedTab.subscribe(function (newValue) {
       var chartOptions = that.API.getChartOptions().models[newValue].options;
       that.UI.createChart(chartOptions);
    });
}

ViewModel.prototype.getVM = function(){
  return new ChartVM();
};

module.exports = ViewModel;