const { devStart } = require('../server');
class Dev {
    constructor() {
        this.commandName = 'dev';
        this.description = 'start react dev server';
        this.options = [
            ['-p, --port <port>', 'set port of server', 9999],
        ];
    }
    action(options) {
        const { port = 9999 } = options
        const numPort = parseInt(port, 10);
        devStart({ port: numPort });
    }
}

module.exports = new Dev();