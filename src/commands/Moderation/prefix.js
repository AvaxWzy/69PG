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
const Schema = require("../../models/config");

class prefix extends Command {
    constructor(client) {
        super(client, {
            name: "prefix",
            description: "Setup a custom prefix for the server",
            aliases: ["pref"],
            howtouse: "<prefix>",
            memberPermissions: ["MANAGE_GUILD"]
        });
    };

    async exec(message, args) {

        const prefix = args[0];

        if (!prefix) {

            return Schema.findOne({ _id: message.guild.id }, async (error, data) => {

                if (!data) {
                    return message.channel.send({
                        embed: {
                            title: message.guild.name,
                            color: this.client.config.embed.color,
                            description: `Prefix \`${require("../../config/bot.json").prefix}\`\n\nDo you want to change the prefix?\nUse \`${require("../../config/bot.json").prefix}prefix <prefix>\``
                        }
                    });
                } else {
                    return message.channel.send({
                        embed: {
                            title: message.guild.name,
                            color: this.client.config.embed.color,
                            description: `Prefix \`${data.prefix}\`\n\nDo you want to change the prefix?\nUse \`${data.prefix}prefix <prefix>\``
                        }
                    });
                };
            });
        };

        if (!prefix.length > 8) {
            return message.channel.send(this.emoji.cross + " Prefix should be below 8 chars");
        };
        
        Schema.findOne({ _id: message.guild.id }, async (error, data) => {

            if (!data) {

                if (prefix === require("../../config/bot.json").prefix) {
                    return message.channel.send(this.emoji.cross + " Prefix is already `!` by default.");
                };
                
                data = new Schema({ _id: message.guild.id, prefix: prefix });

                message.channel.send(this.emoji.tick + ` Prefix has been set to ${prefix}`);

                data.save();
            } else {

                if (prefix === require("../../config/bot.json").prefix) {
                    return Schema.findOneAndDelete({ id: message.guild.id }).then(() => {
                        return message.channel.send(this.emoji.tick + " Prefix has been reset");
                    });
                };

                if (prefix === data.prefix) {
                    return message.channel.send(this.emoji.cross + ` Prefix is already set to \`${prefix}\``);
                };

                return data.updateOne({ id: message.guild.id, prefix: prefix }).then(() => {
                    return message.channel.send(this.emoji.tick + ` Prefix has been set to \`${prefix}\``);
                });
            };
        });
    };
};

module.exports = prefix;
