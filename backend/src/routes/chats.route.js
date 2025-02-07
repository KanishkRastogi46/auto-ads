import dotenv from 'dotenv';
import express from 'express';
import { OpenAI } from 'openai';

dotenv.config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.DEEPSEEK_API_KEY });

router.post('/', async (req, res) => {
    const { message } = req.body;

    if (!message.businessName || !message.adDescription || !message.targetAudience || !message.budget) {
        return res.status(400).json({ error: "All fields (message.businessName, message.adDescription, message.targetAudience, message.budget) are required" });
    }

    try {
        const response = await openai.completions.create({
            model: "deepseek-llm", // Adjust based on the DeepSeek model being used
            prompt: `Generate an optimized ad for ${message.businessName}. Description: ${message.adDescription}. Target Audience: ${message.targetAudience}. Budget: ${message.budget}.`,
            max_tokens: 200
        });

        res.json({ optimizedAd: response.choices[0].text });
    } catch (error) {
        console.error("Error fetching response from DeepSeek API:", error);
        res.status(500).json({ error: "Failed to generate ad from DeepSeek API" });
    }
});

export default router;
