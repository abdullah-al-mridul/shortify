// importing modules
import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

// declaring types
interface User extends Document {
  name: string;
  email: string;
  password: string;
  links: object[];
  comparePassword: (hashedPassword: string) => Promise<boolean>;
}

// creating user schema
const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    links: { type: [{ url: String }] },
  },
  {
    timestamps: true,
  }
);

// pre-save mathod for hash password before save
userSchema.pre<User>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hashedPassword: string = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

// mathod for compare password
userSchema.methods.comparePassword = async function (
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password);
};

// creating exact model for user
const User = model<User>("User", userSchema);

// export user model for external use
export { User };
