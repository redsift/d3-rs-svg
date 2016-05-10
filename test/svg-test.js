var tape = require("tape"),
    jsdom = require("jsdom"),
    d3 = require("d3-selection"),
    svg = require("../");
    
tape("svg() generates svg", function(t) {
    var document = global.document = jsdom.jsdom("<div id='test'></div>");
    try {   
        var elm = svg.html();

        var el = d3.select('#test');
        el.call(elm);
        
        t.equal(el.selectAll('svg').size(), 1)
        
        t.end();
    } finally {
        delete global.document;
    }    
});   

tape("svg() generates 1 svg", function(t) {
    var document = global.document = jsdom.jsdom("<div id='test'></div>");
    try {   
        var elm = svg.html();

        var el = d3.select('#test');
        el.call(elm).call(elm);
        
        t.equal(el.selectAll('svg').size(), 1)
        
        t.end();
    } finally {
        delete global.document;
    }    
});  

tape("svg() generates 2 svgs", function(t) {
    var document = global.document = jsdom.jsdom("<div id='test'></div>");
    try {   
        var el = d3.select('#test');
        el.call(svg.html('svg-1')).call(svg.html('svg-2'));
        
        t.equal(el.selectAll('svg').size(), 2)
        
        t.end();
    } finally {
        delete global.document;
    }    
});  
