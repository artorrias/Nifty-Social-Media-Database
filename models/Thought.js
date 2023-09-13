// id thoughttext username createdAt reactions [] reactionCount __v
const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

module.exports = thoughtSchema;