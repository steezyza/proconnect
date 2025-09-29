import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { BadgeKey } from '../../proconnect/constants'; // Assuming shared types

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: string;
  avatar: string;
  xp: number;
  level: number;
  badges: BadgeKey[];
  completedCourseIds: string[];
  streak: number;
  googleId?: string;
  linkedinId?: string;
  isPasswordMatch(password: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: false, private: true }, // Not required for OAuth users
    role: { type: String, default: 'junior professional' },
    avatar: { type: String },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    badges: [{ type: String, enum: Object.values(BadgeKey) }],
    completedCourseIds: [{ type: String }],
    streak: { type: Number, default: 0 },
    googleId: { type: String, private: true },
    linkedinId: { type: String, private: true },
  },
  { timestamps: true }
);

// Add a toJSON transform to remove private fields
userSchema.set("toJSON", {
  virtuals: true, // Ensure virtuals like 'id' are included
  transform: (doc, ret, options) => {
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  },
});

userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.methods.isPasswordMatch = async function (password: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;