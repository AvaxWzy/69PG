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

const Command = require("../../class/Command");

class help extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            description: "List of all commands",
            cooldown: 5,
            clientPermissions: ["SEND_MESSAGES"]
        });
    };
    /**
     * @param {Message} message 
     * @param {String[]} args 
     */
    async exec(message, args) {

        if (!args[0]) {
            return message.channel.send({
                embed: {
                    title: "Help",
                    description: `For a specific command help. Simply use \`!help <command>\`\nIf you have any command suggestion or want to hang out. Join our [server](${this.client.config.discord.server})`,
                    color: this.config.embed.color,
                    fields: [
                        {
                            name: "Moderation",
                            value: "`kick`, `ban`, `unban`, `clear`, `nuke`, `snipe`, `warn`"
                        },
                        {
                            name: "Utility",
                            value: "`help`, `invite`, `whois`, `bot`"
                        }
                    ]
                }
            })
        } else {

            let command = this.client.commands.get(args[0]);

            if (!command) command = this.client.aliases.get(args[0]);

            if (command) {
                return message.channel.send({
                    embed: {
                        title: command.name,
                        description: "Brackets in the usage are used to show required and optional argument:\n\n<> Required\n[] Optional",
                        color: this.config.embed.color,
                        fields: [
                            {
                                name: "Description",
                                value: command.description,
                                inline: true
                            },
                            {
                                name: "How To Use",
                                value: command.howtouse,
                                inline: true
                            },
                            {
                                name: "Aliases",
                                value: command.aliases ? command.aliases: "None"
                            },
                            {
                                name: "Cooldown",
                                value: command.cooldown + " Seconds"
                            }
                        ]
                    }
                });
            };
        };
    };
};

module.exports = help;
