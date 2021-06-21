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
const Command = require("../../class/Command");

class kick extends Command {
    constructor(client) {
        super(client, {
            name: "kick",
            description: "Kick a user from your server.",
            cooldown: 4,
            clientPermissions: ["SEND_MESSAGES", "KICK_MEMBERS"],
            memberPermissions: ["KICK_MEMBERS"]
        });
    };
    /**
     * @param {Message} message
     */
    async exec (message, args) {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) {
            return message.channel.send(this.emoji.cross + " You have to mention the target or give the id");
        };

        if (member.user.id === message.guild.ownerID) {
            return message.channel.send(this.emoji.cross + " You cannot consider server owner as target");
        };

        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 0) {
            return message.channel.send(this.emoji.cross + " Your role has to be higher than the target role");
        };

        if (message.guild.me.roles.highest.comparePositionTo(member.roles.highest) < 0) {
            return message.channel.send(this.emoji.cross + " My role has to be higher than the target role");
        };

        const reason = args.slice(1).join(" ");

        if (member.kickable) {

            member.kick({
                reason: `${message.author.tag} | ${reason ? reason: "No reason"}`
            });

            message.channel.send(this.emoji.tick + " The user has been kicked.");
        } else {
            return message.channel.send(this.emoji.cross + " The user is a moderator or admin");
        };
    };
};

module.exports = kick;
