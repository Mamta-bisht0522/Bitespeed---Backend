const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    phoneNumber: String,
    email: String,
    linkedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },
    linkPrecedence: {
      type: String,
      enum: ["secondary", "primary"],
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
