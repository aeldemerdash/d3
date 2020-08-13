(function (d3) {
  'use strict';

  const svg = d3.select('svg');

  	// + to convert string to number
  const height = +svg.attr('height');
  const width = +svg.attr('width');

  const render = data => {
   const xValue = d => d.horsepower;
   const yValue = d => d.weight ;
   const margin = {top:100, right:40, bottom:77, left:170}; 
   const innerWidth = width - margin.left - margin.right; 
   const innerHeight = height - margin.top - margin.bottom; 
   const circleRadius = 10;
   const xAxisLabel = 'Horsepower';
   const yAxisLabel = 'Weight';
   const title = 'Cars: Horsepower vs. Weight'; 
   const xScale = d3.scaleLinear()
   		.domain(d3.extent(data, xValue))
   		.range([0, innerWidth])
       .nice();
    
   const yScale = d3.scaleLinear()
   		.domain(d3.extent(data, yValue))
      .range([0, innerHeight])
   		.nice();
   
   
   const g = svg.append('g') 
     .attr('transform', `translate(${margin.left}, ${margin.top})`);

   const xAxis = d3.axisBottom(xScale)
   			.tickSize(-innerHeight)
        .tickPadding(10);
    
   const yAxix = d3.axisLeft(yScale)
   	.tickSize(-innerWidth)
    .tickPadding(15);
    
   const yAxisG =  g.append('g')
     .call(yAxix);
    
     yAxisG.selectAll('.domain')
       .remove();
      yAxisG.append('text')
     .attr('transform', `rotate(-90)`)
     .attr('class', 'axis-label')
     .attr('y', -90)
     .attr('text-anchor', 'middle')
     .attr('x', - innerHeight / 2)
     .attr('fill', 'black')
     .text(yAxisLabel);
    
   const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0, ${innerHeight})`);
    
   xAxisG.select('.domain').remove();
   xAxisG.append('text')
     .attr('class', 'axis-label')
     .attr('y', 75)
     .attr('fill', 'black')
     .attr('x', innerWidth /2)
     .text(xAxisLabel);

   g.selectAll('circle').data(data)
    .enter().append('circle')
      .attr('cy', d => yScale(yValue(d)))
    	.attr('cx', d => xScale(xValue(d)))
    	.attr('r', circleRadius);
   
   g.append('text')
     .attr('class', 'axis-title')
     .attr('y', -10)
     .text(title);
  };

  d3.csv('data.csv')
    .then(data => {
  	// cast string to integer and represent population in millions. 
    data.forEach( d => {
    	d.mpg = +d.mpg;
      d.cylinders = +d.cylinders;
      d.displacement = +d.displacement;
      d.horsepower = +d.horsepower;
      d.weight = +d.weight;
      d.acceleration = +d.acceleration;
      d.year = +d.year;
    });
    render(data);
  });

}(d3));