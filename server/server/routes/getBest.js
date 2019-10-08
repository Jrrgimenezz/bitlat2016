"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeClassInterface_1 = require("./routeClassInterface");
const aqueduct_1 = require("aqueduct");
class getBest extends routeClassInterface_1.routeClassInterface {
    constructor(req, res) {
        super(req, res);
        this.ordersService = new aqueduct_1.Aqueduct.Api.OrdersService();
    }
    handle() {
        const params = {
            makerTokenAddress: this.req.query.makerTokenAddress,
            takerTokenAddress: this.req.query.takerTokenAddress,
            baseTokenAddress: this.req.query.baseTokenAddress,
            quantity: this.req.query.quantity,
            networkId: 1,
            takerAddress: this.req.query.takerAddress
        };
        this.ordersService.getBest(params)
            .then((orders) => {
            this.data = JSON.stringify(this.processOrders(orders));
            this.status = 200;
            this.process();
        })
            .catch((err) => {
            console.log(err);
            this.data = "Something went wrong";
            this.status = 54321;
            this.process();
        });
    }
    processOrders(orders) {
        var processedShit = {
            exchanges: [],
            orderAddresses: [],
            orderValues: [],
            exchangeFees: [],
            v: [],
            r: [],
            s: [],
            z: []
        };
        orders.orders.forEach((e) => {
            var t1 = []
            processedShit.exchanges.push(1);
            t1.push(e.maker);
            t1.push(e.taker);
            t1.push(e.makerTokenAddress);
            t1.push(e.takerTokenAddress);
            t1.push(e.feeRecipient);
            processedShit.orderAddresses.push(t1);
            t1 = []
            t1.push(e.makerTokenAmount);
            t1.push(e.takerTokenAmount);
            t1.push(e.makerFee);
            t1.push(e.takerFee);
            t1.push(e.expirationUnixTimestampSec);
            t1.push(e.salt);
            processedShit.orderValues.push(t1);
            processedShit.exchangeFees.push(2000000000000000);
            t1 = JSON.parse(e.serializedEcSignature);
            processedShit.v.push(t1.v);
            processedShit.r.push(t1.r);
            processedShit.s.push(t1.s);
        });
        return processedShit;
    }
}
exports.getBest = getBest;
