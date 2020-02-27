// load data with queue
var url1 = "./data/countries.geojson"
var url2 = "./data/countries_processed.csv";
var active= d3.select(null);
drawChart("Algeria")
var q = d3_queue.queue(1)
  .defer(d3.json, url1)
  .defer(d3.csv, url2)
  .awaitAll(draw);

function draw(error, data) {
  "use strict";

  // important: First argument it expects is error
  if (error) throw error;

  var color = d3.scaleThreshold()
    .domain([0, 25, 50, 100, 500, 1000, 1500])
    .range(["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f"]);
  // initialize the Bayview as the default neighborhood
  var width = 860,
      height = 800,
      active = d3.select(null);

  var projection = d3.geoMercator()
      .scale(120)
      .translate([width / 2, height / 2]);

  var zoom = d3.zoom().on("zoom", zoomed);
  var path = d3.geoPath().projection(projection);

  var svg = d3.select("#map")
      .attr("width", width)
      .attr("height", height)
      .on("click", stopped, true);

  svg.append("rect")
      .attr("class", "background")
      .attr("width", width)
      .attr("height", height)
      .on("click", reset);

  var g = svg.append("g");
  var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
     .style("display", "inline-block")
    .style("background-color", "black")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("font-size", "20px")
    .style("color","white");


  g.selectAll("path")
      .data(data[0].features)
      .enter()
      .append("path")
      .attr('width', width)
      .attr('height', height)
      .attr("d", path)
      .on("mouseover", function(d){
        tooltip.style("visibility", "visible");
        tooltip.text(d.properties.ADMIN );
        return tooltip;
      })
      .on("mousemove", function(){
        return tooltip.style("top", (event.pageY-20)+"px").style("left",(event.pageX+10)+"px");
      })
      .on("mouseout", function(){
        return tooltip.style("visibility", "hidden");
      })
      .attr("fill", function(d){
        var flag = 0
        for(var row=0; row<data[1].length; row++){
          if(d.properties.ADMIN == data[1][row].Country){
            flag = 1;
           d.count = data[1][row]['Population Density'];
          }
        }
        if(flag == 0){
         d.count = 0;
       }
         return color(d.count);
      })
      .attr("class", "feature")
      .style('stroke', '#999999')
      .style('stroke-width', 0.75)
      .on("click", clicked);

    var th = d3.scaleThreshold()
         .domain([0, 25, 50, 100, 500, 1000, 1500])
        .range(["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f"]);

    var x = d3.scaleLinear()
       .domain([0, 25, 50, 100, 500, 1000, 1500])
        .range([0,15]);

    var xAxis = d3.axisBottom(x)
        .tickSize(7)
        .tickValues(color.domain());
    var leg = d3.select("g").call(xAxis);

    leg.select(".domain")
        .remove();
    leg.selectAll("rect")
      .data(th.range().map(function(color) {
//  console.log("legend called");
        var d = th.invertExtent(color);
        if (d[0] == null) d[0] = x.domain()[0];
        if (d[1] == null) d[1] = x.domain()[1];
        return d;
      }))

      .enter().insert("rect", ".tick")
        .attr("height", 18)
        .attr("x", function(d) { return x(d[0]); })
        .attr("width", function(d) { return x(d[1]) - x(d[0]); })
        .attr("fill", function(d) { return th(d[0]); });

    leg.append("text")
        .attr("fill", "#000")
        .attr("text-anchor", "start")
        .attr("y", -6)
        .text("Population Density");

  g.datum(function(d) {
   var flag = 0
   for(var row=0; row<data[1].length; row++){
     if(d.properties.ADMIN == data[1][row].Country){
       flag = 1;
      d.count = data[1][row]['Population Density'];
     }
   }
   if(flag == 0)
    d.count = 0;

    return d;
  });
  function clicked(d) {
    drawChart(d.properties.ADMIN);
    if (active.node() === this) return reset();

    active.classed("active", false);
    active = d3.select(this).classed("active", true);

    var bounds = path.bounds(d),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = Math.max(1, Math.min(6, 0.8 / Math.max(dx / width, dy / height))),
        translate = [width / 2 - scale * x, (height - 200)/ 1.5 - scale * y];

    svg.transition()
        .duration(750)
        .call( zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale*1) );
  }

  function reset() {
    active.classed("active", false);
    active = d3.select(null);

    svg.transition()
        .duration(750)
        .call( zoom.transform, d3.zoomIdentity );
  }

  function zoomed() {
    g.style("stroke-width", 1.2 / d3.event.transform.k + "px");
    g.attr("transform", d3.event.transform);
  }

  function stopped() {
    if (d3.event.defaultPrevented) d3.event.stopPropagation();
  }

}
