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

const Client = require("./class/Client");
const client = new Client();

["Command", "Event"].forEach(x => {
    require(`./handlers/${x}`)(client);
});

require("../api/api");

client.database(process.env.mongourl || require("./config/bot.json").mongourl);

client.login(process.env.token || require("./config/bot.json").token);
