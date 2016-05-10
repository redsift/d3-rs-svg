var tape = require("tape"),
    jsdom = require("jsdom"),
    d3 = require("d3-selection"),
    svg = require("../");
    
tape("svg() generates svg", function(t) {
    var document = global.document = jsdom.jsdom("<div id='test'></div>");
    try {   
        var elm = svg.svg();

        var el = d3.select('#test');
        el.call(elm);
        
        t.equal(el.selectAll('svg').size(), 1)
        
        t.end();
    } finally {
        delete global.document;
    }    
});   
