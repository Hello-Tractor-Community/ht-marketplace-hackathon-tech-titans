const mongoose = require("mongoose");

const loginAuditsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
        type: String, 
        required: true 
    },
    ip_address: { 
        type: String, 
        required: true 
    },
    device: { 
        type: String, 
        required: true 
    },
    browser: { 
        type: String, 
        required: true 
    },
    action: { 
        type: String, 
        required: true 
    },
  },
  {
    timestamps: true,
  }
);

loginAuditsSchema.index({ user_id: 1 });

const LoginAudits = mongoose.model("LoginAudits", loginAuditsSchema);

module.exports = LoginAudits;
