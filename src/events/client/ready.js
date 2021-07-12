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

class ready extends require("../../class/Event") {
    constructor(client) {
        super(client, {
            name: "ready",
            once: true
        });
    };

    async exec () {
        
        require("../../utils/statpost")(this.client);
        console.log(`Logged into ${this.client.user.tag}`);
    };
};

module.exports = ready;
