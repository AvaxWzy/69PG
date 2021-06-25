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

class warn extends Command {
    constructor(client) {
        super(client, {
            name: "warn",
            description: "Warn a member for his mistake",
            cooldown: 5,
            howtouse: "<user | id> [reason]",
            memberPermissions: ["MANAGE_GUILD"]
        });
    };

    async exec (message, args) {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) {
            return message.channel.send(this.emoji.cross + " You have to mention or give the target id");
        };

        const reason = args.slice(1).join(" ");

        if (!reason) {
            return message.channel.send(this.emoji.cross + " You have to give a reason");
        };

        if (reason.length > 250) {
            return message.channel.send(this.emoji.cross + " Reason must be below 250 chars");
        };

        member.user.send(`You have been warned in ${message.guild.name} for \`${reason}\``).catch(x => {});

        message.channel.send(`\`${member.user.tag}\` has been warned for ${reason.replace("@everyone", "everyone").replace("@here", "here")}`);
    };
};

module.exports = warn;
