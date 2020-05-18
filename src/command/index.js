const commander = require('commander');
const commandPlugin = require('../index');

class Run {
    constructor() {
        this.commander = commander;
        this.init();
    }
    init() {
        this.commander.version(commandPlugin.version).description(commandPlugin.description);
        const { commands } = commandPlugin;
        commands.forEach((plugin) => this.inject(plugin));
        this.commander.parse(process.argv);
    }
    inject(plugin) {
        const { commandName, description, options, action } = plugin;
        let command;
        if (commandName) {
            command = this.commander.command(commandName);
        }

        if (options) {
            options.forEach((option) => {
                command.option(...option);
            })
        }

        if (description) {
            command.description(description);
        }

        if (action) {
            command.action(action);
        }
    }
}

module.exports = new Run();