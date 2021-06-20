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

class clear extends Command {
    constructor(client) {
        super(client, {
            name: "clear",
            aliases: ["purge"],
            cooldown: 4,
            clientPermissions: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
            memberPermissions: ["MANAGE_MESSAGES"]
        });
    };

    async exec(message, args) {

        const amount = args[0];

        if (!parseInt(amount)) {
            return message.channel.send(this.emoji.cross + " You have to give an amount to purge");
        };

        if (amount === 100 || amount > 100) {

            return message.channel.bulkDelete(100).then(() => {
                message.channel.send({
                    embed: {
                        title: "Cleared",
                        description: `\`100\` messages got cleared`,
                        color: this.config.embed.color
                    }
                }).then(x => {
                    x.delete({ timeout: 1000 * 5 });
                });;
            });

        } else {
            return message.channel.bulkDelete(parseInt(amount) + 1).then(() => {
                message.channel.send({
                    embed: {
                        title: "Cleared",
                        description: `\`${amount}\` messages got cleared`,
                        color: this.config.embed.color
                    }
                }).then(x => {
                    x.delete({ timeout: 1000 * 5 });
                });
            });
        };
    };
};

module.exports = clear;
