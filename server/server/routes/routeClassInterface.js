"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class routeClassInterface {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.status = 400;
        this.data = "";
    }
    process() {
        this.res.status(this.status).send(this.data);
    }
}
exports.routeClassInterface = routeClassInterface;
