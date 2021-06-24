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

class Client extends require("discord.js").Client {
    constructor() {
        super({
            messageCacheLifetime: 10e20,
            disableMentions: "everyone",
            ws: {
                intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"]
            }
        });

        this.commands = new (require("discord.js").Collection)();
        this.aliases = new (require("discord.js").Collection)();
        this.cooldowns = new (require("discord.js").Collection)();
        this.config = require("../config/bot.json");
        this.snipes = new (require("discord.js").Collection)();
    };

    database(url) {

        if (!url || typeof(url) !== "string") {
            throw new TypeError("Url is not provided");
        };

        require("mongoose").connect(url, {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true
        });

        require("mongoose").connection.on("connected", () => {
            console.log("Mongodb > Connected");
        });
    };
};

module.exports = Client;
