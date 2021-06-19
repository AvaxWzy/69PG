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

const { sync } = require("glob");
const { resolve } = require("path");

/**
 * @param {import { Client } from "discord.js";} client 
 */
module.exports = async (client) => {

    const events = sync("./src/events/**/**/*.js");

    for (const files of events) {

        const event = new (require(resolve(files)))(client);


        if (!event instanceof(require("../class/Event"))) {
            return;
        };

        if (event.once) {
            client.once(event.name, (...args) => event.exec(...args));
        } else {
            client.on(event.name, (...args) => event.exec(...args));
        };
    };

};
