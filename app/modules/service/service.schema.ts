
import { Schema, model, Types } from "mongoose";


class serviceSchema extends Schema {
    constructor() {
        super({
            name: { type: String, required: true },
        }, {
            timestamps: true,
        });
    }
}

const serviceModel = model('service', new serviceSchema());

export default serviceModel;
