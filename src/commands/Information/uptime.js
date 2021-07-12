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

class uptime extends Command {
    constructor(client) {
        super(client, {
            name: "uptime",
            description: "Total running time of the bot",
            aliases: ["up"],
            cooldown: 8
        });
    };

    async exec (message, args) {
        
        let days = Math.floor(this.client.uptime / 86400000);
        let hours = Math.floor(this.client.uptime / 3600000) % 24;
        let minutes = Math.floor(this.client.uptime / 60000) % 60;
        let seconds = Math.floor(this.client.uptime / 1000) % 60;

        return message.channel.send({
            embeds: [{
                title: "Uptime",
                thumbnail: {
                    url: this.client.user.displayAvatarURL()
                },
                description: `\`\`\`ini\n[ ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds ]\n\`\`\``,
                color: this.config.embed.color,
                timestamp: Date.now()
            }]
        });
    };
};

module.exports = uptime;
