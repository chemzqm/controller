/*global it,describe,afterEach*/
var assert = require('assert');
var controller = require('controller');
var domify = require ('domify');

function create(id) {
  var dom = domify('<div class="controller_test" id="' + id+ '"><button on-click="remove">remove</button></div>');
  document.body.appendChild(dom);
  return dom;
}

//clear controllers
afterEach(function() {
  controller.remove();
})

describe('#define', function() {
  it('should has the attribute el identified by id', function() {
    var id = 'test';
    var dom = create(id);
    var c = controller.define('test', function() {});
    assert.deepEqual(c.el, dom);
  })

  it('should be called with dependency controllers', function(done) {
    var id = 'a';
    var dom = create(id);
    var other = create('dep');
    var dep = controller.define('dep', function() {});
    controller.define(id, function(o) {
      assert(arguments.length == 1);
      assert.deepEqual(o, dep);
      done();
    }, ['dep'])
  })

  it('should bind the event by function name', function() {
    var id = 'test';
    var dom = create(id);
    var called;
    var c = controller.define('test', function() {
      this.remove = function() {
        called = true;
      }
    })
    dom.querySelector('button').click();
    assert(called === true);
  })
})

describe('#remove', function() {
  it('should remove the element', function() {
    var id = 'test';
    var dom = create(id);
    var c = controller.define('test', function() {});
    assert.notEqual(c.el.parentNode, null);
    controller.remove(id);
    assert.equal(c.el.parentNode, null);
  })

  it('should triggger the remove event', function() {
    var id = 'test';
    var dom = create(id);
    var called;
    var c = controller.define('test', function() {
      this.on('remove', function() {
        called = true;
      })
    });
    controller.remove(id);
    assert.deepEqual(called, true);
  })

  it('should clear all the controllers', function() {
    create('a');
    controller.define('a', function() { });
    create('b');
    controller.define('b', function() { });
    var els = document.querySelectorAll('.controller_test');
    assert(els.length == 2);
    controller.remove();
    els = document.querySelectorAll('.controller_test');
    assert(els.length === 0);
  })
})
