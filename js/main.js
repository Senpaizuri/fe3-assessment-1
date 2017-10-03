/*
  Resources used:
  D3 Time       - https://github.com/d3/d3/blob/master/API.md#time-formats-d3-time-format
  D3 Shapes     - https://github.com/d3/d3/blob/master/API.md#shapes-d3-shape
  Area Chart    - https://bl.ocks.org/mbostock/3884914
  Gradients     - https://www.w3schools.com/graphics/svg_grad_linear.asp
  Domain&Extent - http://www.d3noob.org/2012/12/setting-scales-domains-and-ranges-in.html
*/
var
  margin    = {top: 50, right: 50, bottom: 50, left: 50},       //Create margin object
  width     = window.innerWidth*.75 - margin.left - margin.right,   //Set the width to the window inner width minus the set margins
  height    = window.innerHeight*.75 - margin.top - margin.bottom,  //Set the width to the window inner width minus the set margins
  parseDate = d3.timeParse('%Y%m%d'), //Creating a function for parsing data to time
  hue       =[                        //Create a hue object for the desired colors we'll be using later
              {
                'color':'#5BC0EB',
                'stop':'0%'
              },
              {
                'color':'#9BC53D',
                'stop':'50%'
              },
              {
                'color':'#FDE74C',
                'stop':'75%'
              },
              {
                'color':'#F34213',
                'stop':'100%'
              }
            ]
  x         = d3.scaleTime().range([0, width]),     //Create a time scale with a range from 0 to the Window inner width minus the set margins
  y         = d3.scaleLinear().range([height, 0]),  //Create a linear scale with a range from the Window inner height minus the set margins
  xAxis     = d3.axisBottom(x),                     //Create the xAxis on bottom of SVG
  yAxis     = d3.axisLeft(y),                       //Create the yAxis on left of SVG
  path      = d3.line()
              .x(function(d) { return x(d.date) })  //Generating data points for each value on the x-axis
              .y(function(d) { return y(d.temp) })  //Generating data points for each value on the y-axis
  svg       = d3.select('body').append('svg')       //Creating the svg object, which we are using later
                .attr('width', width + margin.left + margin.right)  //Setting up the width and height attributes
                .attr('height', height + margin.top + margin.bottom)
                  .append('g')  //Appending a group into the SVG and translating it via an attribute
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

d3.csv('data.csv', function(error, data) { //Loading in CSV data
  if (error) throw error;

  data.forEach(function(d) {      //For each key the function is run and the data is passed through
    if (d.date && d.temp) {       //If the keys values exists run the following code, otherwise ignore values and continue. This is to check valid data.
      d.date = parseDate(d.date)  //Run the date value through the previously made date parser
      d.temp = +d.temp            //Creating datapoints?
    }
  });
  x.domain(d3.extent(data, function(d) { //Returns all date values in data to the .extent function which finds the minimum and maximum values in the array, whereafter the .domain function returns those values to d3 as the range for the x axis - http://www.d3noob.org/2012/12/setting-scales-domains-and-ranges-in.html
    return d.date;
   }))
  y.domain(d3.extent(data, function(d) {
    return d.temp
  }))

  svg.append('defs')
    .append('linearGradient') //Does the exact same as el.AppendChild(childNode)
      .attr('x1', '0%')       //Does the exact same as el.setAttribute('attr','value') but shorter.
      .attr('y1', '100%')     //Defines the direction of the gradient we're about to make
      .attr('x2', '0%')
      .attr('y2', '0%')
      .attr('id','gradient')  //Lets the element fill the gradient we're about to make

  hue.forEach(function(c){      //Running loop forEach block in the hue object
    d3.select('svg').select('linearGradient') //Selects the desired element
      .append('stop')           //Appends the stop's to the linearGradient to get that juicy gradient
        .attr('offset', c.stop) //Sets the offset for the color
        .attr('style','stop-color:'+c.color+';stop-opacity:1')  //Sets the stopcolor and opacity
  })

  svg.append('path')
      .datum(data)  //Gets the point for the data without making a giant bulk of data the values.
      .attr('class', 'area')
      .attr('d', path)
      .attr('id','line')
      .attr('stroke', 'url(#gradient)')
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)

  animate() //Now the path exists run the animate function

  svg.append('g')    //Appends a group into the svg
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)   //invokes this funtion only once
    .append('text')
      .attr('y', '1.75em')
      .attr('x', '50%')
      .attr('font-size','1.5rem')
      .text('Year')

  svg.append('g')   //Appends a group into the svg
      .attr('class', 'y axis')
      .call(yAxis)  //invokes this funtion only once
    .append('text')
      .attr('style','transform:rotate(-90deg)')
      .attr('y', '-1.8rem')
      .attr('x', '-25%')
      .attr('font-size', '1.5rem')
      .style('text-anchor', 'start')  //Setting styles for the text element
      .text('Temperature (ºC)')


});

function animate(){ //Creating a animation function, Toggles a class which starts the animation
  var
    line       = document.querySelector('#line'),
    lineLength = line.getTotalLength()

    line.style.strokeDasharray =
    line.style.strokeDashoffset = lineLength  //Set the strokeDasharray and offset to it's own length to display it 'outofbounds'

    setTimeout(function(){  //Toggle the animation a tat later to avoid loading weirdness
      line.classList.add('animateLine')
      line.style.strokeDashoffset = 0
    },250)
}
