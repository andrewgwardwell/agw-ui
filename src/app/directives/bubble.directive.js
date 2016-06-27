(function(){
'use strict';
angular.module('agwUi')
  .directive('simpleLineChart', d3S);
  d3S.$inject = ['d3Service', '$compile'];
  function d3S(d3Service, $compile) {
    return {
      restrict: 'EA',
      scope: {
        'data': '='
      },
      templateUrl: '/app/templates/bubble.template.html',
      link: function(scope, element, attrs) {
        scope.addData = function(point){
            var order = 0;
            if(scope.data.length === 0){
              order = 1;
            } else {
              order = scope.data[scope.data.length-1].order + 1;
            }
            var obj = {
              name: point.name,
              size: point.size, 
              desc: point.description,
              order: order
            };
            scope.data.push(obj);
            update();
        }
        scope.removeBubble = function(bubble){
            var name = element;
            scope.data.pop();
            update();
        }
        var bindEvents = function(){
          element.find('circle').bind('click', function(e){
                  scope.removeBubble();
                  console.log('I\'ve just been clicked!');
          });
        };


        var keyFn = function(d){
          return d;
        };
        var render = function(){
          d3Service.d3().then(function(d3) {
            var vis=d3.select(".graph").append("svg:svg").attr("width",500).attr("height",500).attr("class", "chart");
            var line= vis.selectAll("line").data(scope.data).enter().append("svg:line");
            var circle=vis.selectAll("circle").data(scope.data).enter().append("svg:circle");
            var text=vis.selectAll("text").data(scope.data).enter().append("text");
            line.attr("x1",function(d) {return d.order*60;})
              .attr("class", "line")
              .attr("x2",function(d) {return 60;})
              .attr("y1",function(d) {return 20;})
              .attr("y2",function(d) {return 20;})
              .attr("stroke", "black")
              .attr("strokeWidth","3px");
            circle.attr("r",function(d) {return 20;})
              .attr("class", "circle")
              .attr("cx",function(d) {return d.order*60;})
              .attr("cy",function(d) {return 20;})
              .attr("fill","steelblue");
            text.attr("x",function(d,i) {return d.order*60;})
              .attr("class", "text")
              .attr("y",function(d) {return 20;})
              .text( function (d) { return "( " + d.name + " )"; })
              .attr("font-family", "sans-serif")
              .attr("font-size", "10px")
              .attr("fill", "white");
          });
        };

        var update = function(){
            var vis = d3.select(".chart");
            var lines = vis.selectAll("line.line").data(scope.data);
            var circles = vis.selectAll("circle.circle").data(scope.data);
            var texts = vis.selectAll("text.text").data(scope.data);
            lines.enter().append("line").style("opacity", 0).attr('class', 'line').transition(1000).style("opacity", 1);
            circles.enter().append("circle").attr('class', 'circle');
            texts.enter().append("text").attr('class', 'text');
            lines.attr("x1",function(d) {
              return d.order*60;
            })
              .attr("x2",function(d) {return 60;})
              .attr("y1",function(d) {return 20;})
              .attr("y2",function(d) {return 20;})
              .attr("stroke", "black")
              .attr("strokeWidth","3px");
            circles.attr("r",function(d) {return 20;})
              .attr("cx",function(d) {return d.order*60;})
              .attr("cy",function(d) {return 20;})
              .attr("fill","steelblue")
              .attr("ng-click", function(d){ return 'removeBubble()'; });
            texts.attr("x",function(d) {return d.order*60;})
              .attr("y",function(d) {return 20;})
              .text( function (d) { return "( " + d.name + " )"; })
              .attr("font-family", "sans-serif")
              .attr("font-size", "10px")
              .attr("fill", "white");
            lines.exit().remove();
            circles.exit().remove();
            texts.exit().remove();
        };

        render();

      }};
    };
})();
