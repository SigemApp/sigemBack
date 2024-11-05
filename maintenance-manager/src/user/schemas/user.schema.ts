import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: {
      type: String,
      select: true,
    },

    create_at: {
      type: Date,
      default: Date.now,
      select: false,
    },

    update_at: {
      type: Date,
      select: false,
      default: null,
    },
  },
  {

    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret.create_at;
        delete ret.update_at;
      },
    },
  }
);
