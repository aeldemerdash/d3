(function (d3) {
	'use strict';

	const svg = d3.select('svg');


	// + to convert string to number
	const height = +svg.attr('height');
	const width = +svg.attr('width');

	// group element
	const g = svg.append('g')
					.attr('transform',
	              `translate(${width/2}, ${height/2})`);


	const cricle = g.append('circle')
	  		.attr('r', height / 2 )
				.attr('fill', 'yellow')
				.attr('stroke', 'black');

	const eyeSpacing = 100;
	const eyeYOffset = -70;
	const eyeReadius = 40;
	const eyeBrowWidth = 50;
	const eyeBrowHeight = 20;
	const eyeBrowYOffset = -70;

	const eyesG = g.append('g')
	 					.attr('transform', `translate(0, ${eyeYOffset})`);

	const leftEye = eyesG.append('circle')
	  		.attr('r', eyeReadius )
				.attr('cx', -eyeSpacing);

	const rightEye = eyesG.append('circle')
	  		.attr('r', eyeReadius)
				.attr('cx', eyeSpacing);

	const eyesbrowsG = eyesG.append('g')
	 					.attr('transform', `translate(0, ${eyeBrowYOffset})`);
	eyesbrowsG
		.transition().duration(2000)
				.attr('transform', `translate(0, ${eyeBrowYOffset- 50})`)
		.transition().duration(2000)
				.attr('transform', `translate(0, ${eyeBrowYOffset})`);

	const leftEyebrow = eyesbrowsG
		.append('rect')
			.attr('x', -eyeSpacing - eyeBrowWidth /2)
	    .attr('width', eyeBrowWidth)
			.attr('height', eyeBrowHeight)
			.attr();

	const rightEyebrow = eyesbrowsG
		.append('rect')
			.attr('x', eyeSpacing - eyeBrowWidth /2)
	    .attr('width', eyeBrowWidth)
			.attr('height', eyeBrowHeight);

	const mouth = g.append('path')
				.attr('d', d3.arc()({
	        innerRadius: 150,
				  outerRadius: 170,
	  			startAngle: Math.PI /2 ,
	  			endAngle: Math.PI * 3 / 2
	      }));

}(d3));
