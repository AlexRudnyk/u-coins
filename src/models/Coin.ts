import { model, models, Schema } from "mongoose";

const coinSchema = new Schema(
  {
    title: {
      type: "string",
      required: true,
    },
    year: {
      type: "string",
      required: true,
    },
    photoURL: {
      type: ["string"],
      required: true,
    },
    spec: {
      type: "string",
      required: true,
    },
    price: {
      type: "number",
      required: true,
      // default: "за домовленістю",
    },
    description: {
      type: "string",
      required: true,
    },
    comments: [
      {
        userName: {
          type: "string",
          required: true,
        },
        text: {
          type: "string",
          required: true,
        },
        reply: {
          type: "string",
          required: false,
        },
        date: {
          type: Date,
          default: Date.now(),
          required: false,
        },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

export default models.Coin || model("Coin", coinSchema);
