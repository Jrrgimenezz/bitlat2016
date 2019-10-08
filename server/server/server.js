"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTokens_1 = require("./routes/getTokens");
const getBest_1 = require("./routes/getBest");
const aqueduct_1 = require("aqueduct");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 6612;
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.api();
        this.app.listen(port, () => {
            console.log("Server listening on: " + port);
        });
    }
    api() {
        let router;
        router = express.Router();
        function helper(path, route) {
            router.get("/api" + path, (req, res) => {
                return (new route(req, res)).handle();
            });
        }
        helper("/get_tokens", getTokens_1.getTokens);
        helper("/get_best", getBest_1.getBest);
        this.app.use(router);
    }
    config() {
        aqueduct_1.Aqueduct.Initialize();
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }
    routes() {
    }
}
exports.Server = Server;
