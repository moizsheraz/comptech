import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    about: {
      type: String,
      required: true,
    },
    session: {
      type: Number,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    // currentPosition: {
    //     type: String,
    //     required: true
    // },
    // socialMedia: [
    //     {
    //         name: {
    //             type: String,
    //         },
    //         link: {
    //             type: String,
    //         }
    //     }
    // ],
    // career: [
    //     {
    //         team: {
    //             type: String,
    //         },
    //         stage: {
    //             type: String,
    //         }
    //     }
    // ]
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
