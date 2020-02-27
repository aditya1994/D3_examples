// this is where your implementation for your flow diagram should go 
function FlowDiagram(svg, data) {
    this.svg = svg;
    
    // grab the bounding box of the container
    var boundingBox = svg.node().getBoundingClientRect();

    //  grab the width and height of our containing SVG
    var svgHeight = boundingBox.height;
    var svgWidth = boundingBox.width;

    // this is where your code should go to generate the flow diagram from the random data
    var lx = 100;
    var ly = 50;  

    var mx = 300;
    var my = 50;  


    var rx = 500;
    var ry = 50;  


    svg.append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    var i, j, k;
    i = j = k = -1;    
    var ly, my, ry;    
     this.draw = function(newdata) {

        svg.append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

 
        i = -1;
        d3.selectAll(".exit").remove();

        var textValues = svg.selectAll("text")
                        .data(newdata, d => d.id);
        textValues.exit()
        	.text(function(d){ return d.name})
         	.attr("fill", "red")
         	.attr("class", "exit")
         	.transition()
        	.attr("x", rx)
            .attr("y", function(d) { i++; return ry + i*20});
            
            // .delay(function(d){ return 300; })
            // .duration(1000);
   
      
        j = -1;    	
        textValues
        	.text(function(d){ return d.name})
         	.attr("fill", "orange")
         	.attr("class", "update")
         	.transition()
        	.attr("x", mx)
            .attr("y", function(d) { j++; return my + j*20});
            
            //.delay(function(d){ return 300; })
            //.duration(1000);

       
        k = -1;
        d3.selectAll(".enter").remove();
        textValues.enter()
        	.append("text")
        	.transition()
        	.text(function(d){ return d.name})
        	.attr("class", "enter")
         	.attr("fill", "green")
        	.attr("x", lx)
            .attr("y", function(d) { k++; return ly + k*20});
           
            //.delay(function(d){ return 300; })
            //.duration(1000);

    }
    this.draw(data);

}
