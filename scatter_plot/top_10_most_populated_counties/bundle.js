(function (d3) {
  'use strict';

  const svg = d3.select('svg');

  	// + to convert string to number
  const height = +svg.attr('height');
  const width = +svg.attr('width');

  const render = data => {
   const xValue = d => d.population;
   const yValue = d => d.country;
   const margin = {top:50, right:40, bottom:70, left:170}; 
   const innerWidth = width - margin.left - margin.right; 
   const innerHeight = height - margin.top - margin.bottom; 
    
   const xScale = d3.scaleLinear()
   		.domain([0, d3.max(data, xValue)])
   		.range([0, innerWidth])
       .nice();
    
   const yScale = d3.scalePoint()
   		.domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.7);  
   
   
   const g = svg.append('g') 
     .attr('transform', `translate(${margin.left}, ${margin.top})`);

   const xAxisTickFormat = number => d3.format('.3s')(number).replace('G', 'B');
   const xAxis = d3.axisBottom(xScale)
   			.tickFormat(xAxisTickFormat)
   			.tickSize(-innerHeight);
   const yAxix = d3.axisLeft(yScale)
   	.tickSize(-innerWidth);
    
   g.append('g')
     .call(yAxix)
     .selectAll('.domain')
       .remove();
    
   const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0, ${innerHeight})`);
    
   xAxisG.select('.domain').remove();
   xAxisG.append('text')
     .attr('class', 'axis-label')
     .attr('y', 65)
     .attr('fill', 'black')
     .attr('x', innerWidth /2)
     .text('Population');

   g.selectAll('circle').data(data)
    .enter().append('circle')
      .attr('cy', d => yScale(yValue(d)))
    	.attr('cx', d => xScale(xValue(d)))
    	.attr('r', 18 );
   
   g.append('text')
     .attr('class', 'axis-title')
     .attr('y', -10)
     .text('Top 10 most populated countries');
  };

  d3.csv('data.csv').then(data => {
  	// cast string to integer and represent population in millions. 
    data.forEach( d => {
    	d.population = +d.population * 1000;
    });
    render(data);
  });

}(d3));

