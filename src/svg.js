import { select } from "d3-selection";

export default function svg(id) {
  
  var width = 300,
      height = 150,
      top = 16,
      right = 16,
      bottom = 16,
      left = 16,
      scale = 1,
      inner = 'g.inner',
      innerWidth = -1,
      innerHeight = -1,
      style = null,
      classed = 'svg-svg';

  function _updateInnerWidth() {
      innerWidth = width - left - right;
  }    
  
  function _updateInnerHeight() {
      innerHeight = height - top - bottom;
  }   
  
  _updateInnerWidth();
  _updateInnerHeight();
        
  function _impl(context) {
    var selection = context.selection ? context.selection() : context,
        transition = (context.selection !== undefined);

    selection.each(function() {
      var parent = select(this);

      var el = parent.select(_impl.self());
      if (el.empty()) {
        el = parent.append('svg')
                    .attr('version', '1.1')
                    .attr('xmlns', 'http://www.w3.org/2000/svg')
                    .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink') // d3 work around for xlink not required as per D3 4.0
                    .attr('preserveAspectRatio', 'xMidYMid meet')
                    .attr('id', id);
        
        el.append('defs');
        
        el.append('g').attr('class', 'inner');
      }
      
      var defsEl = el.select('defs');
      
      var styleEl = defsEl.selectAll('style').data(style ? [ style ] : []);
      styleEl.exit().remove();
      styleEl = styleEl.enter().append('style').attr('type', 'text/css').merge(styleEl);
      styleEl.text(style);
      
      var gEl = el.select(_impl.child());
      
      // Never transition
      
      el.attr('class', classed)
            
      if (transition === true) {
        el = el.transition(context);
        gEl = gEl.transition(context);
      }     

      // Transition if enabled
      el.attr('width', width * scale)
        .attr('height', height * scale)
        .attr('viewBox', '0 0 ' + width + ' ' + height);
    
      gEl.attr('transform', 'translate(' + left + ',' + top + ')');

    });
  }

  _impl.self = function() { return 'svg' + (id ?  '#' + id : ''); }
  _impl.child = function() { return inner; }
  _impl.childDefs = function() { return 'defs'; }
  _impl.childWidth = function() { return innerWidth; }
  _impl.childHeight = function() { return innerHeight; }

  _impl.id = function() {
    return id;
  };
    
  _impl.classed = function(value) {
    return arguments.length ? (classed = value, _impl) : classed;
  };

  _impl.style = function(value) {
    return arguments.length ? (style = value, _impl) : style;
  };
    
  _impl.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    _updateInnerWidth();
    return _impl;
  };

  _impl.height = function(value) {
    if (!arguments.length) return width;
    height = value;
    _updateInnerHeight();
    return _impl;
  };
  
  _impl.scale = function(value) {
    return arguments.length ? (scale = value, _impl) : scale;
  };
 
  _impl.margin = function(value) {
    if (!arguments.length) return {
      top: top,
      right: right,
      bottom: bottom,
      left: left
    };
    if (value.top !== undefined) {
      top = value.top;
      right = value.right;
      bottom = value.bottom;
      left = value.left; 
    } else {
      top = value;
      right = value;
      bottom = value;
      left = value;
    }     
    _updateInnerWidth();
    _updateInnerHeight();
    return _impl;
  };
    
  return _impl;
}
