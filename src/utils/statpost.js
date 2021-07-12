const { Client } = require('rdl.js');

module.exports = async (client) => {

    /**
     * [Rovelstars](https://discord.rovelstars.com/bots/766267194073939968)
     * Post stats to rovel stars
     */
    const rdl = new Client();
    var servers = client.guilds.cache.size;

    rdl.login(process.env.RDL).then(() => {

        setInterval(() => {
            rdl.bot.postServers(Number(servers));
        }, 38000)
    });

    /**
     * [Top.gg](https://top.gg/bot/766267194073939968)
     * Post stats to top.gg
     */
    const TopApi = require("@top-gg/sdk").Api;
    const topgg = new TopApi(process.env.TopGG, client);

    setInterval(() => {
        topgg.postStats({ serverCount: Number(servers), shardCount: 1});
    }, 68000)
    

    /**
     * [Discord Boats](https://discord.boats/bot/766267194073939968)
     * Post stats to discord boats
     */
    const { Boat } = require("discordboats");
    const boat = new Boat();

    boat.on("Ready", () => {
        
        setInterval(() => {
            boat.postServers(client.user.id, Number(servers));
        }, 280000)
    });

    boat.login(process.env.Boats);
};
