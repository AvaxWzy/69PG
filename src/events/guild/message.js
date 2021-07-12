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

const { Message } = require("discord.js");
const Event = require("../../class/Event");
const Schema = require("../../models/config");

class message extends Event {
    constructor(client) {
        super(client, {
            name: "messageCreate"
        });
    };

    async exec(message) {

        let prefix;

        const schema = await Schema.findOne({ _id: message.guild.id });

        if (!schema) {
            prefix = require("../../config/bot.json").prefix; 
        } else {
            prefix = schema.prefix;
        };

        if (message.author.bot) {
            return;
        };

        if (message.channel.type !== "text") {
            return;
        };

        if (!message.content.startsWith(prefix)) {
            return;
        };

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const name = args.shift().toLowerCase();

        let command = this.client.commands.get(name);

        if (!command) command = this.client.aliases.get(name);

        if (command) {

            if (!this.client.cooldowns.has(command.name)) {
                this.client.cooldowns.set(command.name, new (require("discord.js").Collection)());
            };

            const now = Date.now();
            const time = this.client.cooldowns.get(command.name);
            const cooldown = (command.cooldown || 5) * 1000;

            const expiry = time.get(message.author.id) + cooldown;

            if (now < expiry) {
                return;
            }

            time.set(message.author.id, now);
            setTimeout(() => time.delete(message.author.id), cooldown);

            if (command.memberPermissions) {

                let array = [];

                command.memberPermissions.forEach(x => {

                    if (!message.member.permissions.has(x)) {
                        array.push("\n`" + x + "`");
                    };
                });

                if (array.length) {
                    return message.channel.send({ content: `You need the following permissions: \n${array.join("\n")}`})
                };
            };

            if (command.clientPermissions) {

                let array = [];

                command.clientPermissions.forEach(x => {

                    if (!message.guild.me.permissions.has(x)) {
                        array.push("\n`" + x + "`");
                    };
                });

                if (array.length) {
                    return message.channel.send({ content: `I need the following permissions: \n${array.join("\n")}`});
                };
            };

            command.exec(message, args);
        };
    };
};

module.exports = message;
