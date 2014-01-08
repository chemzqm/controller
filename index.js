var Emitter = require ('emitter');
var events = require ('event');

var event_names = [
  'change',
  'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'blur',
  'focus',
  'input',
  'submit',
  'keydown',
  'keypress',
  'keyup'
];

function traverse(node, fn) {
  fn(node);
  for (var i = 0; i < node.children.length; i++) {
    var n = node.children[i];
    traverse(n, fn);
  }
}

var cache = {};

function get(id) {
  return cache[id];
}

function set(id, controller) {
  if (cache[id]) throw new Error('controller ' + id + ' already defined');
  cache[id] = controller;
}

exports.get = get;
/**
 * define a controller
 *
 * @param {String} id Element id as controller id
 * @param {Function} fn constructor of controller
 * @param {Array} deps [optional] dependencies controllers
 * @api public
 */
exports.define = function(id, fn, deps) {
  var el = document.getElementById(id);
  deps = deps || [];
  var args = deps.map(function(id) {
    return get(id);
  })
  var subs = [];
  event_names.forEach(function(name) {
    var attr = 'on-' + name;
    traverse(el, function(node) {
      if (node.hasAttribute(attr)) {
        var method = node.getAttribute(attr);
        subs.push([node, name, method]);
      }
    })
  });
  var F = function() {
    this.el = el;
    this.id = id;
    fn.apply(this, args);
    bind(this, subs);
  }
  Emitter(F.prototype);
  var controller = new F();
  set(id, controller);
  return controller;
}

function bind(ctx, subs) {
  var unbinds = [];
  subs.forEach(function(arr) {
    var el = arr[0];
    var type = arr[1];
    var method = arr[2];
    var fn = ctx[method] ? ctx[method].bind(ctx) : function(){};
    events.bind(el, type, fn);
    unbinds.push(function() {
      events.unbind(el, type, fn);
    })
  })
  ctx.unbind = function() {
    unbinds.forEach(function(fn) {
      fn();
    })
  }
}

function destroy(controller) {
  var el = controller.el;
  controller.emit('remove');
  controller.off();
  controller.unbind();
  delete cache[controller.id];
  el.parentNode.removeChild(el);
}

/**
 * remove the controller by id or remove all the controllers
 * @param {String} id
 * @api public
 */
exports.remove = function(id) {
  if (!arguments.length) {
    for (var p in cache) {
      destroy(cache[p]);
    }
    return;
  }
  destroy(get(id));
}
