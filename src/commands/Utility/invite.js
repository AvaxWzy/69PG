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

class invite extends Command {
    constructor(client) {
        super(client, {
            name: "invite",
            description: "Invite the bot to your server",
            aliases: ["inv"],
            cooldown: 5,
            clientPermissions: ["SEND_MESSAGES"]
        });
    };

    async exec(message, args) {

        return message.channel.send({
            content: "Thank you so much <3",
            embeds: [{
                title: "Invite",
                description: "[Click here to invite the bot](" + this.config.invite.url + ")",
                color: this.config.embed.color
            }]
        });
    };
};

module.exports = invite;
