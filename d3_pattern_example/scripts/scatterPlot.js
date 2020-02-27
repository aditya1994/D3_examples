// this is where your implementation for your scatter plot should go 
function ScatterPlot(svg, data, updateFlowDiagram) {

    var margins = {
        top: 30,
        bottom: 30,
        left: 30,
        right: 30
    };

    this.svg = svg;
    
    // grab the bounding box of the container
    var boundingBox = svg.node().getBoundingClientRect();

    //  grab the width and height of our containing SVG
    var svgHeight = boundingBox.height;
    var svgWidth = boundingBox.width;
    var pad = 30;

    // Set Intial Scales for X & Y Axis
    var xs = d3.scaleLinear().range([pad, svgWidth]);
    var ys = d3.scaleLinear().range([svgHeight - pad, pad]);

    // Defining X & Y Axis
    xs.domain([d3.min(data, function(d){return d.v0}), d3.max(data, function(d){return d.v0})]);
    ys.domain([d3.extent(data, function(d){return d.v1})]);

    var xAxis = d3.axisBottom(xs); var yAxis = d3.axisLeft(ys);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (svgHeight - pad) +")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate("+ pad +",0)")
        .call(yAxis);

    svg.append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    data.forEach(function(d) { d.v0 = +d.v0; d.v1 = +d.v1; } );
 
    xs.domain([d3.min(data, function(d){return d.v0}), d3.max(data, function(d){return d.v0})]);
    ys.domain([d3.min(data, function(d){return d.v1}), d3.max(data, function(d){return d.v1})]);

    xAxis = d3.axisBottom(xs);
    yAxis = d3.axisLeft(ys);
    var m1, m2, mi1, mi2;
    // Draw Function for Scatter Plot
    this.draw = function(newdata) {

        svg.append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

        newdata.forEach(function(d) { d.v0 = +d.v0; d.v1 = +d.v1; })
        m1 = d3.max(newdata, function(d){return d.v0}); m2 = d3.max(newdata,function(d){return d.v1});
        mi1 = d3.min(newdata, function(d){return d.v0}); mi2 = d3.min(newdata, function(d){return d.v1});
        
        xs.domain([mi1, m1]);
        ys.domain([mi2, m2]);



        var circleValues = svg.selectAll("circle").data(newdata, function(d){return d.id});

        circleValues.exit().remove();

        circleValues.attr("fill", "orange")
            .transition()
            .attr("cx", function(d){return xs(d.v0)})
            .attr("cy", function(d){return ys(d.v1)});
            // .delay(function(d){ return 300; })
            // .duration(1000);
   
            

        circleValues.enter()
            .append("circle")
            .attr("r", 3)
            .attr("fill", "green")
            .transition()
            .attr("cx", function(d){return xs(d.v0)})
            .attr("cy", function(d){return ys(d.v1)});
           // .delay(function(d){ return 300; })
            // .duration(1000);
   


        svg.select(".x.axis")
            .transition()
            .call(xAxis);

        svg.select(".y.axis")
            .transition()
            .call(yAxis);

    }
    this.draw(data);
    
}
