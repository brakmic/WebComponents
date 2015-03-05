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