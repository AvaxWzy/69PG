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

class nuke extends Command {
    constructor(client) {
        super(client, {
            name: "nuke",
            description: "Delete and clone with same name",
            aliases: ["dclone"],
            cooldown: 10,
            howtouse: "[reason]",
            clientPermissions: ["SEND_MESSAGES", "MANAGE_CHANNELS"],
            memberPermissions: ["ADMINISTRATOR"]
        });
    };

    async exec(message, args) {

        const m = await message.channel.send(
            ":warning: Are you sure want to nuke this channel?\n\n**Note:** It deletes and creates with same name\n\nType `yes` or `no`"
        );

        if (message.channel.deletable !== true) {

            return message.channel.send(
                ":warning: This channel is not deletable"
            );
        };

        const reason = args.join(" ");

        const collector = await message.channel.createMessageCollector(
            (x) => x.author.id === message.author.id,
            {
                max: 3,
                time: 10000
            }
        );

        collector.on("collect", async x => {

            if (x.content.toLowerCase() === "yes") {
                collector.stop();

                message.channel.clone().then(channel => {
                    channel.send({
                        embed: {
                            title: "Nuked",
                            color: this.config.embed.color,
                            description: "The previous channel has nuked and replaced with this one.",
                            thumbnail: {
                                url: message.author.displayAvatarURL({ dynamic: true })
                            },
                            fields: [
                                {
                                    name: "Moderator",
                                    value: message.author.tag
                                },
                                {
                                    name: "Reason",
                                    value: reason ? reason : "No Reason"
                                }
                            ]
                        }
                    });
                    channel.setPosition(message.channel.position);
                });

                message.channel.delete(`Nuked | ${message.author.tag}`);
            } else
                if (x.content.toLowerCase() === "no") {
                    collector.stop();

                    return message.channel.send("Alright! The process has been cancelled");
                } else {
                    return message.channel.send(":warning: The input is invalid and should be `yes` or `no`");
                };
        });

        collector.on("end", x => {

            if (!x.size) {
                m.delete();
                message.channel.send("⏱️ Timed out.\n\nPlease try again later.");
            };
        });
    };
};

module.exports = nuke;
