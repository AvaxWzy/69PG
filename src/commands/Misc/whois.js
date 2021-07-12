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

function isBot(value) {

    let string = `${value}`;
    string = string.replace("true", "Yes");
    string = string.replace("false", "No");

    return string;
};

class whois extends Command {
    constructor(client) {
        super(client, {
            name: "whois",
            description: "User information",
            aliases: ["userinfo", "ui"],
            cooldown: 10,
            clientPermissions: ["SEND_MESSAGES"]
        });
    };

    async exec(message, args) {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        return message.channel.send({
            embeds: [{
                title: member.user.tag,
                thumbnail: {
                    url: member.user.displayAvatarURL({ dynamic: true })
                },
                color: this.config.embed.color,
                fields: [
                    {
                        name: "Joined Discord",
                        value: require("moment")(member.user.createdAt).format("LLL"),
                        inline: true
                    },
                    {
                        name: "Joined Server",
                        value: require("moment")(member.joinedAt).format("LLL"),
                        inline: true
                    },
                    {
                        name: "Permissons",
                        value: `\`${member.permissions.toArray().length}\``
                    },
                    {
                        name: "Avatar",
                        value: `[Click to hover](${member.user.displayAvatarURL({ dynamic: true })})`
                    },
                    {
                        name: "Bot",
                        value: isBot(member.user.bot)
                    }
                ],
                footer: {
                    text: `ID: ${member.user.id}\nRequested by ${message.author.tag}`
                }
            }]
        });
    };
};

module.exports = whois;
