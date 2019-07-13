import { Schema, model } from "mongoose";

let FileSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    extension: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    children: [
        {
            type: Schema.Types.ObjectId,
            ref: "File"
        }
    ],
    permissions: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            role: {
                type: Schema.Types.ObjectId,
                ref: 'Role',
                required: true
            },
            read: {
                type: Boolean,
                required: true
            },
            write: {
                type: Boolean,
                required: true
            }
        }
    ],
    isDirectory: {
        type: Boolean,
        required: true
    },
    website: {
        type: Schema.Types.ObjectId,
        ref: "Website",
        required: true
    }
});

export default model("File", FileSchema);
