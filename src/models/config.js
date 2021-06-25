const { Schema, model } = require("mongoose");

class Prefix {
    constructor() {
        this.schema = Schema;
    };

    getSchema () {

        return new this.schema({
            _id: String,
            prefix: { type: String, default: require("../config/bot.json").prefix}
        }, {
            _id: true,
            versionKey: false
        });
    };
};


module.exports = model("Prefix", new Prefix().getSchema());
