# d3-rs-svg

`d3-rs-svg` is a component for creating a SVG 1.1 root element that is compatable with the D3 [margin convention](https://bl.ocks.org/mbostock/3019563). This component is dependent on D3 v4 (Alpha).

## Builds

[![Circle CI](https://circleci.com/gh/Redsift/d3-rs-svg.svg?style=svg)](https://circleci.com/gh/Redsift/d3-rs-svg)

UMD from //static.redsift.io/reusable/d3-rs-svg/latest/d3-rs-svg.umd-es2015.min.js

## Usage

### Browser
	
	<script src="//static.redsift.io/reusable/d3-rs-svg/latest/d3-rs-svg.umd-es2015.min.js"></script>
	<script>
		var svg = d3_rs_svg.html();
		...
	</script>

### ES6

	import * as svg from "@redsift/d3-rs-svg";
	let eml = svg.html();
	...

If using rollup.js for a browser target, ensure `d3-rs-svg` is part of the global map.
	
### Require

	var svg = require("@redsift/d3-rs-svg");
	var eml = svg.html();
	...
	
By convention, the SVG element is meant to be hosted in a HTML node, hence `svg.html()`

### Parameters

Name|Description|Transition
----|-----------|----------
width,height|SVG viewport size, px|Y
scale|SVG scaling factor, floating point|Y
margin|margin convention, Object or integer px|Y
classed|SVG custom class|N
style|SVG CSS embed|N
background|Rect background color|Y
title||N
role|https://www.w3.org/TR/wai-aria/roles#img|N

Parameters that support transition can be animated and chained.

	d3.select('#elm')
		.call(svg)					// draw the SVG at default (1x) scale
	.transition().duration(1000)
		.call(svg.scale(2.0))		// scale the SVG by 2x
	.transition().duration(333)
		.call(svg.scale(1.0))		// bounce back after 333ms

Note, this form of chaining does not work for parameters that do not support transition. Use the `on('end', ...` event for them.

	var el = d3.select('#elm')
		.call(svg.style('rect{fill: yellow;}'));
	
  	el.select(svg.self()).select(svg.child())
      	.append('rect')				// add a rect to the SVG we can paint with CSS
        	.attr('width', svg.childWidth())
        	.attr('height', svg.childHeight());
  
	el.transition().delay(1000).duration(0).on('end', function() {
		 el.transition().duration(1000).delay(500)
          	.call(svg.scale(2.0).style('rect{fill: green;}'));	// this green is applied after 1s of delay but 500ms before the scale changes
	});
	
## Accessible features

This module implements some of the [features described here](https://www.sitepoint.com/tips-accessible-svg/).	
	