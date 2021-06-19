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

class Command {
    constructor(client, options = {
        name: "",
        cooldown: 0
    }) {
        this.client = client;
        this.name = options.name;
        this.cooldown = options.cooldown;
    };
    /**
     * @param {import { Message } from "discord.js";} message 
     * @param {String[]} args 
     */
    async exec (message, args) {

        throw new ReferenceError(`Command: ${this.name}\nMissing exec method`);
    };
};

module.exports = Command;
