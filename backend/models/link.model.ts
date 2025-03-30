// importing modules
import mongoose, { Schema, model, Document, ObjectId } from "mongoose";

// declaring types
interface Link extends Document {
  fullLink: string;
  shortLink: string;
  user: ObjectId;
}

// creating link schema
const linkSchema = new Schema<Link>(
  {
    fullLink: {
      type: String,
      required: true,
    },
    shortLink: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// creating exact model for link
const Link = model<Link>("Link", linkSchema);

// export link model for external use
export { Link };
