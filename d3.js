let data = Array.from({ length: 100 }, () => [Math.random() * 500, Math.random() * 500]);

let svgScatter = d3.select("#scatter")
  .attr("width", 500)
  .attr("height", 500);

let xScale = d3.scaleLinear()
  .domain([0, 500])
  .range([50, 450]);
let yScale = d3.scaleLinear()
  .domain([0, 500])
  .range([450, 50]);

svgScatter.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(d[0]))
  .attr("cy", d => yScale(d[1]))
  .attr("r", 5)
  .attr("fill", "steelblue");

svgScatter.append("g")
  .attr("transform", "translate(0,450)")
  .call(d3.axisBottom(xScale));
svgScatter.append("g")
  .attr("transform", "translate(50,0)")
  .call(d3.axisLeft(yScale));

svgScatter.append("text")
  .attr("x", 250)
  .attr("y", 25)
  .attr("text-anchor", "middle")
  .text("Scatter Plot of 100 Random Points");

d3.csv("titanic.csv").then(function(data) {

  let ageData = d3.nest()
    .key(function(d) { return Math.floor(+d.Age / 10) * 10; })
    .rollup(function(v) { return v.length; })
    .entries(data);

  let width = 500;
  let height = 500;
  let margin = 50;

  let svgPie = d3.select("#pie")
    .attr("width", width)
    .attr("height", height);

  let pie = d3.pie()
    .value(function(d) { return d.value; });
  let arc = d3.arc()
    .innerRadius(0)
    .outerRadius(Math.min(width, height) / 2 - margin);

  let colorScale = d3.scaleOrdinal()
    .domain(ageData.map(function(d) { return d.key; }))
    .range(d3.schemeCategory10);

  svgPie.selectAll("path")
    .data(pie(ageData))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .attr("fill", function(d) { return colorScale(d.data.key); })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
  
  svgPie.append("text")
    .attr("x", width / 2)
    .attr("y", margin / 2)
    .attr("text-anchor", "middle")
    .text("Age Distribution of Titanic Passengers");
});

