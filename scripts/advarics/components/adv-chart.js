/*jshint multistr: true */
'use strict';
var UI    = require('ui');
var VM    = require('vm');

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