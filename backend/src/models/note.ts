import { InferSchemaType, model, Schema } from "mongoose";

const noteScehema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
  },
  { timestamps: true }
);

type Note = InferSchemaType<typeof noteScehema>;

export default model<Note>("Note", noteScehema);
