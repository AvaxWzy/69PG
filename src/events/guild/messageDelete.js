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

const Event = require("../../class/Event");

class messageDelete extends Event {
    constructor(client) {
        super(client, {
            name: "messageDelete"
        });
    };

    async exec(message, args) {

        if (message.author.bot) {
            return;
        };

        const snipe = {
            content: message.content,
            author: {
                name: message.author.username,
                userid: message.author.id,
                avatar: message.author.displayAvatarURL({ dynamic: true, size: 2048 }),
                discriminator: message.author.discriminator,
            },
            attachment: message.attachments.first()?.proxyURL || null,
            timestamp: Date.now()
        }

        this.client.snipes.set(message.channel.id, snipe);

    };
};

module.exports = messageDelete;
