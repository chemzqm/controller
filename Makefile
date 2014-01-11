
build: components index.js
	@component build --dev

components: component.json
	@component install --dev

test-browser:
	@./node_modules/.bin/component-test browser

test:
	@./node_modules/.bin/component-test phantom

clean:
	rm -fr build components template.js

.PHONY: clean test
