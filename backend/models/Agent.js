const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AgentModel = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    companyDetails: {
        name: { type: String, required: false },
        description: { type: String, required: false },
    },
    contactDetails: {
        phone: { type: String, required: true },
        email: { type: String, required: true },
    },
    verified: { type: Boolean, default: false },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
});

const Agent = mongoose.model('Agent', AgentModel);

module.exports = Agent;
