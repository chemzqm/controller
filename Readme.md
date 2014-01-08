
# controller

  Identified controller with emitter and dependency injection support.

  A controller is mapped with an element with `id` identifier and the `el` attribute of controller point to that element.

  The elements within the controller could use `on-[event]` to bind the function on the controller to the element.

## Installation

  Install with [component(1)](http://component.io):

    $ component install chemzqm/controller

## Events

  All the controllers would an instance of Emitter, `on` `off` `once` `emit` methods are available.

  * `remove` triggered when the controller is removed.

## API

### .define(id, fn, [deps])

Bind the controller to element with `id`, use `fn` as constructor and optional dependency constructors.

### .get(id)

Get the controller by id.

### .remove([id])

Remove the controller by id, all the events would be remoed.
With empty arguments, all the controllers would be removed.

## License

  The MIT License (MIT)

  Copyright (c) 2014 <copyright holders>

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
