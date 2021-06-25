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

class ban extends Command {
    constructor(client) {
        super(client, {
            name: "ban",
            description: "Ban a user from your server.",
            cooldown: 4,
            clientPermissions: ["SEND_MESSAGES", "BAN_MEMBERS"],
            memberPermissions: ["BAN_MEMBERS"]
        });
    };

    async exec (message, args) {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) {
            return message.channel.send(this.emoji.cross + " You have to mention the target or give the id");
        };

        if (member.user.id === message.guild.ownerID) {
            return message.channel.send(this.emoji.cross + " You cannot consider server owner as target");
        };
        
        if (member.user.id === message.author.id) {
            return message.channel.send(this.emoji.cross + "You cannot ban yourself");
        };

        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 0) {
            return message.channel.send(this.emoji.cross + " Your role has to be higher than the target role");
        };

        if (message.guild.me.roles.highest.comparePositionTo(member.roles.highest) < 0) {
            return message.channel.send(this.emoji.cross + " My role has to be higher than the target role");
        };

        const reason = args.slice(1).join(" ");

        if (member.bannable) {

            member.ban({
                reason: `${message.author.tag} | ${reason ? reason: "No reason"}`
            });

            message.channel.send(this.emoji.tick + " The user has been banned.");
        } else {
            return message.channel.send(this.emoji.cross + " The user is a moderator or admin");
        };
    };
};

module.exports = ban;
