"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeClassInterface_1 = require("./routeClassInterface");
class getTokens extends routeClassInterface_1.routeClassInterface {
    constructor(req, res) {
        super(req, res);
    }
    handle() {
        var tokens = {};
        tokens['DAI'] = { tokenAddress: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359" };
        tokens['WETH'] = { tokenAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" };
        this.data = JSON.stringify(tokens);
        this.status = 200;
        this.process();
    }
}
exports.getTokens = getTokens;
