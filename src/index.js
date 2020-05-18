const dev = require('./command/dev');
module.exports = {
    scope: 'react',
    version: require('../package.json').version,
    description: 'run react app',
    commands: [dev],
}