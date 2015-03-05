/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var Chart = __webpack_require__(1);
	//main entry point
	/*$(function(){
	
	});*/
	
	function domLoaded (e) {
	   var advChart = new Chart();
	  advChart.registerComponent();
	  advChart.activateComponent();
	  console.log('app started');
	}
	document.addEventListener("load", domLoaded, false);
	document.addEventListener("DOMContentLoaded", domLoaded, false);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*jshint multistr: true */
	'use strict';
	var UI    = __webpack_require__(2);
	var VM    = __webpack_require__(3);
	
	/* define KO/chart component */
	
	function AdvChart(){
	  this.UI             = new UI();
	  this.componentName  = 'adv-chart-component';
	  this.elementId      = 'adv-chart-element';
	  this.childElemClass = 'adv-chart-element-child';
	  this.paramsAttrValue = 'vm: chartVM';
	}
	/* prepare a view model for charts */
	var ViewModel = function(){
	  this.VM = new VM();
	  this.chartVM = this.VM.getVM();
	};
	
	/* activate component via DOM operations */
	AdvChart.prototype.activateComponent = function() {
	  var that = this;
	  var panel = this.UI.getMainPanel();
	  //remove any previous chart elements
	  this.UI.removeByClassName();
	  //create a new chart and assign it needed IDs and VM mappings for DevExpress
	  this.el = document.createElement(that.componentName);
	  this.el.setAttribute('id', that.elementId);
	  this.el.setAttribute('params', that.paramsAttrValue);
	  this.el.className = this.el.className + ' ' + that.childElemClass;
	  panel.appendChild(this.el);
	  //let KO apply the bindings
	  ko.applyBindings(new ViewModel(), document.getElementById(that.elementId));
	};
	
	AdvChart.prototype.registerComponent = function() {
	    //a simple template to show three tabs with Line, Pie & Bar Charts
	    var _template = "<div data-bind=\"dxTabs: {\
	                                    dataSource: vm.tabs,\
	                                    selectedIndex: vm.selectedTab,\
	                                    onSelectionChanged: vm.onSelectionChanged,\
	                                    onItemClick: vm.onItemClick,\
	                                    onContentReady: vm.onContentReady,\
	                                    onItemRendered: vm.onItemRendered\
	                                }\"></div><div class=\"tabContent\" data-bind=\"template: \
	                                'tab-content-template'\"></div><script type=\"text/html\" \
	                                id=\"tab-content-template\">\
	                                <h3 data-bind=\"text: vm.tabContent\">\
	                                </h3><div id=\"adv-dyn-chart\"></div></script>";
	    //register component by using KO's facilities
	    ko.components.register(this.componentName, {
	        viewModel: function (params) {
	            this.vm = params.vm;
	        },
	        template: _template
	    });
	
	};
	
	module.exports = AdvChart;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* global _ */
	/* helper module for creation of UI elements */
	'use strict';
	
	function UI() {
	    this.parentId       = 'main-panel';
	    this.childElemClass = 'adv-component';
	    this.chartPanelId   = 'adv-dyn-chart';
	    this.elementId      = 'adv-chart-element';
	    this.width          = '600';
	    this.height         = '600';
	}
	//remove any previous HTML-element instances with same type/signature
	UI.prototype.removeByClassName = function (className){
	    var that         = this;
	    var c            = className || that.childClass;
	    var olderWidgets = document.getElementsByClassName(c);
	    if(olderWidgets.length > 0){
	      _.each(olderWidgets, function(widget){
	        if(widget){
	            if(widget.parentNode){
	                widget.parentNode.removeChild(widget);
	            }
	            else
	            {
	                console.log('no parent node, removing by using a temp-DIV');
	                var tmp = document.createElement('div');
	                tmp.appendChild(widget);
	                tmp.removeChild(widget);
	            }
	            console.log('removed existing widget instance: ' + widget.id);
	        }
	      });
	    }
	};
	
	//create a new chart defined by given options
	UI.prototype.createChart = function(options) {
	    this.removeByClassName(this.childElemClass);
	    //hook into the main-panel from index.html
	    var panel          = document.getElementById(this.chartPanelId);
	    var newChart       = document.createElement('canvas');
	    newChart.id        = this.elementId;
	    newChart.className = newChart.className  + ' ' + this.childElemClass;
	    newChart.setAttribute('width', this.width);
	    newChart.setAttribute('height', this.height);
	    panel.appendChild(newChart);
	    //Chartjs utilizes <canvas> to create charts
	    var context = newChart.getContext("2d");
	    switch(options.chartType){
	        case 'Bar': {
	           return new Chart(context).Bar(options.data);
	        }
	        break;
	        case 'Pie': {
	           return  new Chart(context).Pie(options.data, options.contextOptions.pieOptions);
	        }
	        break;
	        case 'Line': {
	           return  new Chart(context).Line(options.data);
	        }
	        break;
	    }
	};
	//helper to get the mail panel in current DOM
	UI.prototype.getMainPanel = function(){
	    var that = this;
	    return document.getElementById(that.parentId);
	};
	
	module.exports = UI;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* for creation of view models */
	'use strict';
	var UI = __webpack_require__(2);
	var API   = __webpack_require__(4);
	
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map