// set the dimensions and margins of the graph
var newCity = "Algeria";

function drawChart(country){
  newCountry = country;
  //console.log(newCountry);
  d3.select("#chart").selectAll(".node").remove();
  var margin = 50,
    width = 700,
    height = 950;

      var dataset = {
                "children": [
                    {"Name":"Population","Count":4159, "Avg":0},
                    {"Name":"Area","Count":2583, "Avg":0},
                    {"Name":"Population Density","Count":2074, "Avg":0},

                    {"Name":"Net Migration","Count":1809, "Avg":0},
                    {"Name":"Infant Mortality","Count":1713, "Avg":0},
                    {"Name":"GDP","Count":1636, "Avg":0},
                    {"Name":"Literacy","Count":1566, "Avg":0},


                    {"Name":"Birthrate", "Count":1341, "Avg":0},
                    {"Name":"Deathrate","Count":1331, "Avg":0},
                ]
            };


  d3.csv("./data/countries_processed.csv", function(err, data){

    if(err) return err;
    var count = 0;
    var continent = "";
    for(var row=0; row<data.length; row++){
      if(newCountry == data[row].Country)
        continent = data[row].Region;
    }

    for(var row=0; row<data.length; row++){
      if(newCountry == data[row].Country){
        for(var val=0; val<dataset["children"].length; val++){
          dataset["children"][val]["Count"] = data[row][dataset["children"][val]["Name"]];
        }
      }
    }

    for(var row=0; row<data.length; row++){
      if(continent == data[row].Region){
        count+=1;
        for(var val=0; val<dataset["children"].length; val++){
          if(typeof data[row][dataset["children"][val]["Name"]] != 'undefined' && data[row][dataset["children"][val]["Name"]].length != 0)
            dataset["children"][val]["Avg"] += parseInt(data[row][dataset["children"][val]["Name"]]);
        }
      }
    }

    for(var val=0; val<dataset["children"].length; val++){
      if(count != 0)
        dataset["children"][val]["Avg"] = dataset["children"][val]["Avg"]/count;
      else
        dataset["children"][val]["Avg"] = 0;
    }

    console.log(dataset, count, continent);
    var diameter = 500;
    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var bubble = d3.pack(dataset)
        .size([height, width])
        .padding(1.5);

    d3.select("#chart").selectAll("node").remove();
    var svg = d3.select("#chart")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "bubble");

    var nodes = d3.hierarchy(dataset)
        .sum(function(d) {

          if(d.Avg != 0)
          return d.Count/d.Avg;
          else return d.Count;
        });

    var node = svg.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function(d){
            return  !d.children
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    // node.append("title")
    //     .text(function(d) {
    //         if(d.Avg!= 0)
    //           return d.Name + ": " + d.Count + "/n" + "Average " + d.Avg;
    //         else {
    //           return d.Name + ": " + d.Count + "/n" + "Average: N/A";
    //         }
    //     });

    node.append("circle")
        .attr("r", function(d) {
            return d.r;
        })
        .style("fill", function(d,i) {
            return color(i);
        });

    node.append("text")
        .attr("dy", ".4em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data.Name.substring(0, d.r / 3);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function(d){
            return d.r/5;
        })
        .attr("fill", "white");

    node.append("text")
        .attr("dy", "1.8em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data.Count;
        })
        .attr("font-family",  "Gill Sans", "Gill Sans MT")
        .attr("font-size", function(d){
            return d.r/5;
        })
        .attr("fill", "white");

    node.append("text")
            .attr("dy", "3.8em")
            .style("text-anchor", "middle")
            .text(function(d) {
              if(d.data.Avg!= 0)
                return  "Average: " + d.data.Avg.toFixed(2);
              else {
                return  "Average: N/A";
              }
            })
            .attr("font-family",  "Gill Sans", "Gill Sans MT")
            .attr("font-size", function(d){
                return d.r/7;
            })
            .attr("fill", "white");

    d3.select(self.frameElement)
        .style("height", diameter + "px");

  });

};
