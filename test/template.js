var mock = require('./mock');
var pkg = require('../package.json');
var Output = require('../lib/output/base');

describe('Template', function() {
    var output;

    before(function() {
        return mock.outputDefaultBook(Output, {})
        .then(function(_output) {
            output = _output;
        });
    });

    describe('.renderString', function() {
        it('should render a simple string', function() {
            return output.template.renderString('Hello World')
                .should.be.fulfilledWith('Hello World');
        });

        it('should render with variable', function() {
            return output.template.renderString('Version is {{ gitbook.version }}')
                .should.be.fulfilledWith('Version is '+pkg.version);
        });
    });

    describe('Blocks', function() {
        it('should correctly add a block', function() {
            output.template.addBlock('sayhello', function(blk) {
                return 'Hello ' + blk.body + '!';
            });

            return output.template.renderString('{% sayhello %}World{% endsayhello %}')
                .should.be.fulfilledWith('Hello World!');
        });

        it('should correctly add a block with kwargs', function() {
            output.template.addBlock('sayhello_kwargs', function(blk) {
                return 'Hello ' + blk.kwargs.name + '!';
            });

            return output.template.renderString('{% sayhello_kwargs name="World" %}{% endsayhello_kwargs %}')
                .should.be.fulfilledWith('Hello World!');
        });
    });
});
