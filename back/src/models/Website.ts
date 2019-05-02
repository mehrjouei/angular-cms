import { Schema, model } from "mongoose";

let WebsiteSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    favicon: {
        type: String,
        default: "",
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    port: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

export default model("Website", WebsiteSchema);
