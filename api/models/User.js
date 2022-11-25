import mongoose from "mongoose";

/**
 * User Schema Design
 */
const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    sur_name: {
      type: String,
      required: true,
      trim: true,
    },
    secondary_name: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    mobile: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    birth_date: {
      type: String,
    },
    birth_month: {
      type: String,
    },
    birth_year: {
      type: String,
    },
    gander: {
      type: String,
      enum: ["male", "female", "custom"],
    },
    profile_photo: {
      type: String,
      default: null,
    },

    cover_photo: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    work: {
      type: Array,
      default: [],
    },
    edu: {
      type: Array,
      default: [],
    },
    living: {
      type: String,
      default: null,
    },
    home_town: {
      type: String,
      default: null,
    },
    relationship_status: {
      type: String,
      enum: ["Married", "Singel", "In a Relationship"],
    },
    join: {
      type: Date,
    },
    social: {
      type: Array,
      default: [],
    },
    friends: {
      type: Array,
      default: [],
    },
    follwings: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    requests: {
      type: Array,
      default: [],
    },
    block: {
      type: Array,
      default: [],
    },
    posts: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    access_token: {
      type: String,
    },
    isActivate: {
      type: Boolean,
      default: false,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// export model
export default mongoose.model("User", userSchema);
