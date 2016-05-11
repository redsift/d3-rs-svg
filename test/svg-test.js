var tape = require("@redsift/tape-reel")("<div id='test'></div>"),
    d3 = require("d3-selection"),
    svg = require("../");
    
tape("svg() generates svg", function(t) {
    var elm = svg.html();

    var el = d3.select('#test');
    el.call(elm);
    
    t.equal(el.selectAll('svg').size(), 1)
    
    t.end();
});   

tape("svg() generates 1 svg", function(t) {
    var elm = svg.html();

    var el = d3.select('#test');
    el.call(elm).call(elm);
    
    t.equal(el.selectAll('svg').size(), 1)
    
    t.end();
});  

tape("svg() generates 2 svgs", function(t) {
    var el = d3.select('#test');
    el.call(svg.html('svg-1')).call(svg.html('svg-2'));
    
    t.equal(el.selectAll('svg').size(), 2)
    
    t.end();
});  

tape("svg() generates a selectable child", function(t) {
    var elm = svg.html();

    var el = d3.select('#test');
    var child = el.call(elm).call(elm).select(elm.self()).select(elm.child());
    
    t.equal(child.size(), 1)
    
    t.end();
});  