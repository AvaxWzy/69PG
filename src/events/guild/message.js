// Copyright 2021 AvaxWzy

/*Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.*/

const Event = require("../../class/Event");

class message extends Event {
    constructor(client) {
        super(client, {
            name: "message"
        });
    };
    
    async exec (message) {

        if (message.author.bot) {
            return;
        };

        if (message.channel.type !== "text") {
            return;
        };

        if (!message.content.startsWith(require("../../config/bot.json").prefix));

        const args = message.content.slice(require("../../config/bot.json").prefix.length).trim().split(/ +/g);
        const name = args.shift().toLowerCase();

        let command = this.client.commands.get(name);

        if (!command) command = this.client.aliases.get(name);

        if (command) {

            if (command.clientPermissions) {

                let array = [];

                command.clientPermissions.forEach(x => {
                    
                    if (!message.guild.me.hasPermission(x)) {
                        array.push(x);
                    };
                });

                if (array.length) {
                    return;
                };
            };

            if (command.memberPermissions) {

                let array = [];

                command.memberPermissions.forEach(x => {

                    if (!message.member.hasPermission(x)) {
                        array.push(x);
                    };

                    if (array.length) {
                        return;
                    };
                });
            };

            command.exec(message, args);
        };
    };
};

module.exports = message;
