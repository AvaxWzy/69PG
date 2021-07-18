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

class snipe extends Command {
    constructor(client) {
        super(client, {
            name: "snipe",
            description: "Snipe last deleted message or list of a user",
            aliases: ["s"],
            howtouse: "[user]",
            cooldown: 4,
            clientPermissions: ["SEND_MESSAGES"],
            memberPermissions: ["MANAGE_MESSAGES"]
        });
    };
    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     * @returns 
     */
    async exec(message, args) {

        let snipe = this.client.snipes.get(message.channel.id);

        if (!snipe) {
            return message.channel.send(":white_check_mark: There is no deleted message :)");
        };

        let text = snipe.content;

        let content;

        if (text.length > 2048) {

            content = text.slice(0, 2048);
        } else {
            content = text;
        };

        return message.channel.send({
            embeds: [{
                author: {
                    name: snipe.author.name,
                    icon_url: snipe.author.avatar
                },
                description: content,
                color: this.client.config.embed.color,
                image: {
                    url: snipe.attachment
                },
                footer: {
                    text: `${require("moment")(snipe.timestamp).fromNow()}`
                }
            }]
        });
    };
};

module.exports = snipe;
