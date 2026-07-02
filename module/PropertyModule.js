import { Schema, model, Types } from "mongoose";

const PropertySchema = new Schema({

    type: {
        type: String,
        required: true,
        trim: true,
    },

    location: {
        type: String,
        required: true,
        trim: true,
    },

    area: {
        type: Number,
        required: true,
        min: 1,
    },

    image: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
        min: 0,
    },

    contact: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        required: true,
        maxlength: 500,
    },

    likedList: [
        {
            type: Types.ObjectId,
            ref: "User",
        }
    ],

    owner: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    }

});

const Property = model("PropertiesInfo", PropertySchema, "Properties");
export default Property;
