var svgWidth = 960;
var svgHeight = 500;
var margin = {top:20, right:40, bottom: 60, left: 100};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create a SVG wrapper
var svg = d3
    .select(".chart")
    .append("svg")
    .attr("width",svgWidth)
    .attr("height",svgHeight)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var chartGroup = svg.append("g");

d3.select(".chart").append("div").attr("class","tooltip").style("opacity",0);

d3.csv('healthData.csv',function(err, healthData) {

    if (err) throw err;

    healthData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

    
    var yLinearScale = d3.scaleLinear().range([height,0]);
    var xLinearScale = d3.scaleLinear().range([0,width]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //scale

    xLinearScale.domain([7,d3.max(healthData, function(data) {
            return +data.poverty;
        }),
    ]);
    yLinearScale.domain([0, d3.max(healthData, function(data) {
        return +data.healthcare;
        }),
    ]);


    var toolTip = d3
        .tip()
        .attr("class", "toolTip")
        .offset([80,-60])
        .html(function(data){
            var stateName = data.state;
            var pov = +data.poverty;
            var health = +data.healthcare;
            return(stateName + "<br> Poverty(%): " + pov + "<br> healthcare service (Median) " + health
            );
        });
    chartGroup.call(toolTip);

    
    chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx",function(data, index){
            return xLinearScale(data.poverty);
        })
        .attr("cy",function(data, index){
            return yLinearScale(data.healthcare);
        })
        .attr("r", "20")
        .attr("stroke", "black")
        .attr("opacity", 0.75)
        .attr("fill", "salmon")
        .on("mouseover", function(data ) {
            toolTip.show(data,this);
        })
        .on("mouseout", function(data, index) {
            toolTip.hide(data,this);
        });
    
    
    chartGroup.append("g")
        .attr('transform', `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g").call(leftAxis);
// append virsual class state 
    svg.selectAll(".state")
    .data(healthData)
    .enter()
    .append("text")
    .text(function(data){return data.abbr;})
    .attr("x", function(data){
        return xLinearScale(data.poverty);
    })
    .attr("y", function(data) {
        return yLinearScale(data.healthcare);
    })
    .attr("font-size","10px")
    .attr("fill","blue")
    .style("text-anchor","middle");
    
    
        chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - height / 2)
        .attr("dy","1em")
        .attr("class", "axisText")
        .text("Lack healthcare (%)");

    
        chartGroup.append("text")
        .attr("transform","translate(" + width / 2 + " , " + (height + margin.top + 30) + ")",)
        .attr("class", "axisText")
        .text("In Poverty (%)");
});