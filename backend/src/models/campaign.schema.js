import mongoose, { Schema } from "mongoose";


const campaignSchema = new Schema({
    userId: String,
    budget: Number,
    keywords: [String],
    targetAudience: String,
    status: String, // e.g., "created", "approved", "rejected"
});


const campaign = mongoose.models.campaigns || mongoose.model("campaigns", campaignSchema);

export default campaign;