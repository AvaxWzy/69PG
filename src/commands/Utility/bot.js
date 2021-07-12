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

class bot extends Command {
    constructor(client) {
        super(client, {
            name: "bot",
            description: "About 69PG",
            aliases: ["botinfo", "69pg"]
        });
    };

    async exec (message, args) {

        return message.channel.send({
            embeds: [{
                title: "Client Info",
                description: "A basic moderation bot for your server that can help your moderators to moderate the server smoothly.",
                color: this.client.config.embed.color,
                thumbnail: {
                    url: this.client.user.displayAvatarURL({ dynamic: true})
                },
                fields: [
                    {
                        name: "Name",
                        value: require("../../../package.json").name
                    },
                    {
                        name: "ID",
                        value: `${this.client.user.id}`
                    },
                    {
                        name: "Version",
                        value: require("../../../package.json").version
                    },
                    {
                        name: "Guilds",
                        value: `${this.client.guilds.cache.size}`
                    },
                    {
                        name: "Users",
                        value: `${this.client.users.cache.size}`
                    }
                ]
            }]
        });
    };
};

module.exports = bot;
