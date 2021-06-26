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

class server extends Command {
    constructor(client) {
        super(client, {
            name: "server",
            description: "Server Information",
            aliases: ["si", "serverinfo"],
            cooldown: 10
        });
    };

    async exec (message, args) {

        return message.channel.send({
            embed: {
                title: message.guild.name,
                color: this.config.embed.color,
                thumbnail: {
                    url: message.guild.iconURL({ dynamic: true })
                },
                fields: [
                    {
                        name: "ID",
                        value: message.guild.id
                    },
                    {
                        name: "Created At",
                        value: require("moment")(message.guild.createdAt).format("LLL")
                    },
                    {
                        name: "Region",
                        value: `${message.guild.region}`
                        .replace("india", "India")
                        .replace("europe", "Europe")
                        .replace("brazil", "Brazil")
                        .replace("japan", "Japan")
                        .replace("russia", "Russia")
                        .replace("singapore", "Singapore")
                        .replace("southafrica", "South Africa")
                        .replace("sydeny", "Sydeny")
                        .replace("us-west", "US West")
                        .replace("us-east", "Us East")
                        .replace("us-central", "US Central")
                        .replace("us-south", "US South")
                    },
                    {
                        name: "Verification",
                        value: `${message.guild.verificationLevel}`
                        .replace("NONE", "None")
                        .replace("LOW", "Low")
                        .replace("MEDIUM", "Medium")
                        .replace("HIGH", "High")
                        .replace("VERY_HIGH", "Very High")
                    }
                ]
            }
        });
    };
};

module.exports = server;
