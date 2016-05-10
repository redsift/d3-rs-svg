var tape = require("tape"),
    jsdom = require("jsdom"),
    html = require("html"),
    d3 = require("d3-selection"),
    svg = require("../");

function dumpOnError(t, document) {
    t.test("state", function(s) {
        if (t._ok || process.env.CI) return s.end();
        console.log(html.prettyPrint(jsdom.serializeDocument(document), {indent_size: 2}));
        return s.end();
    });    
}
    
tape("svg() generates svg", function(t) {
    var document = global.document = jsdom.jsdom("<div id='test'></div>");
    dumpOnError(t, document);    
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
    dumpOnError(t, document);    
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
    dumpOnError(t, document);    
    try {   
        var el = d3.select('#test');
        el.call(svg.html('svg-1')).call(svg.html('svg-2'));
        
        t.equal(el.selectAll('svg').size(), 2)
        
        t.end();
    } finally {
        delete global.document;
    }    
});  

tape("svg() generates a selectable child", function(t) {
    var document = global.document = jsdom.jsdom("<div id='test'></div>");
    dumpOnError(t, document);
    try {   
        var elm = svg.html();

        var el = d3.select('#test');
        var child = el.call(elm).call(elm).select(elm.child());
        
        t.equal(child.size(), 1)
        
        t.end();
    } finally {
        delete global.document;
    }    
});  