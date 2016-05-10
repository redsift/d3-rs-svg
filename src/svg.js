import { select } from "d3-selection";

export default function svg(id) {
  
  var classed = 'svg-svg';
      
  function _impl(context) {
    var selection = context.selection ? context.selection() : context;
    
    selection.each(function() {
      var parent = select(this);

      var el = parent.select('svg' + (id ?  '#' + id : ''));
      if (el.empty()) {
        el = parent.append('svg').attr('id', id);
      }
      el.attr('class', classed);
      
    });
  }

  _impl.id = function() {
    return id;
  };
    
  _impl.classed = function(value) {
    return arguments.length ? (classed = value, _impl) : classed;
  };
  
  return _impl;
}
