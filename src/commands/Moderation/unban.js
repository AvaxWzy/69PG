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

class unban extends Command {
    constructor(client) {
        super(client, {
            name: "unban",
            description: "Unban someone from the server ban list",
            cooldown: 5,
            clientPermissions: ["SEND_MESSAGES", "BAN_MEMBERS"],
            memberPermissions: ["BAN_MEMBERS"]
        });
    };

    async exec(message, args) {

        const userid = args[0];

        if (!parseInt(userid)) {
            return message.channel.send(this.emoji.cross + "You have to give the user id");
        };

        const reason = args.slice(1).join(" ");

        const list = await message.guild.fetchBans();

        const checkBan = list.find(x => x.user.id === userid);

        if (checkBan) {
            message.guild.members.unban(userid, `${message.author.tag} | ${reason ? reason : "No reason"}`).then(() => {
                message.channel.send(this.emoji.tick + " The user has been unbanned");
            });
        } else {
            return message.channel.send(this.emoji.cross + " The user is not banned");
        };
    };
};

module.exports = unban;
