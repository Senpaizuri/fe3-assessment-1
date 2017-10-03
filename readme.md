# Assement 1
For this first assesment I was tasked with handeling a dataset and making a visual of the data.

## Process
The process from point A to B.
### The Setup
The first thing I did was setting up and linking the basic files.
* index.html
* css/master.css
* js/main.js
* readme.md
* data.csv

I pulled the Temperature [data](https://github.com/cmda-fe3/course-17-18/blob/master/assessment-1/temperature.csv) and began working my magic.

### Choosing the Graph
When choosing my graph I had to skim through the data and look for a proper visualisation.
I had a look the pre-build [examples](https://github.com/d3/d3/wiki/Gallery) and the only graph that made sense at the time (It was late and I didn't read that well) was the [Bivariate Area Chart](https://bl.ocks.org/mbostock/3884914).
Only this morning I realised there also was a simple  [Line Chart](https://bl.ocks.org/mbostock/3883245). But by then it was already too late.
That evening I already rebuild the Bivariate chart into a Line Chart with common sense and a little bit of trial and error.

The example was build in D3 **v.3**. I first hooked up my own dataset and went bug-fixing. Since the code wasn't meant to handle de dataset I supplied I had to rewrite a few lines.

```Javascript
  //Example code
  var area = d3.svg.area()
      .x(function(d) { return x(d.date); })
      .y0(function(d) { return y(d.low); })
      .y1(function(d) { return y(d.high); });

  //Re:written code
  var
    path  = d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.temp) })
```

Also, because the example was meant for 3 keys, I rewrote this code block;
```Javascript
  //Example Code
  d3.tsv("data.tsv", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
      d.date = parseDate(d.date);
      d.low = +d.low;
      d.high = +d.high;
    });

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([d3.min(data, function(d) { return d.low; }), d3.max(data, function(d) { return d.high; })]);

  //Re:written code
  d3.csv('data.csv', function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {     
      if (d.date && d.temp) {     
        d.date = parseDate(d.date)  
        d.temp = +d.temp          
      }
    });
    x.domain(d3.extent(data, function(d) {
      return d.date;
     }))
    y.domain(d3.extent(data, function(d) {
      return d.temp
    }))
```
Whilst "fixing" the code i simultaneously refactored all of the deprecated code to **v.4**.

### The Fun Stuff

Now that the code was fully functioning and showing the data I wanted to pimp the graph with some budget animations and gradients.

For the gradients I made a **Hue** object. This stores the prefered colors for the gradient
```Javascript
hue =[                      
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
```
## Features
*  [D3 Time](https://github.com/d3/d3/blob/master/API.md#time-formats-d3-time-format)       - https://github.com/d3/d3/blob/master/API.md#time-formats-d3-time-format
*  [D3 Shapes](https://github.com/d3/d3/blob/master/API.md#shapes-d3-shape)     - https://github.com/d3/d3/blob/master/API.md#shapes-d3-shape
*  [Area Chart](https://bl.ocks.org/mbostock/3884914)    - https://bl.ocks.org/mbostock/3884914
*  [Gradients](https://www.w3schools.com/graphics/svg_grad_linear.asp)     - https://www.w3schools.com/graphics/svg_grad_linear.asp
*  [Domain&Extent](http://www.d3noob.org/2012/12/setting-scales-domains-and-ranges-in.html) - http://www.d3noob.org/2012/12/setting-scales-domains-and-ranges-in.html





