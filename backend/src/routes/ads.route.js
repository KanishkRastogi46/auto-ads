import { config } from 'dotenv';
import express from 'express';
import { GoogleAdsApi } from 'google-ads-api';

config();

const router = express.Router();

const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN
});


router.post('/create-ad', async (req, res) => {
    // const { campaignId, adGroupId, headline, description, finalUrl } = req.body;

    // if (!campaignId || !adGroupId || !headline || !description || !finalUrl) {
    //     return res.status(400).json({ error: "All fields (campaignId, adGroupId, headline, description, finalUrl) are required" });
    // }

    const customer = client.Customer({
        customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID,
        refresh_token: req.body.refreshtoken
    });

    try {
        await customer.campaigns.create({
        
        });
        // const adResponse = await customer.adGroups.create({
        //     campaign_id: campaignId,
        //     ad_group_id: adGroupId,
        //     ad: {
        //         expanded_text_ad: {
        //             headline_part1: headline,
        //             headline_part2: "Your perfect solution!",
        //             description: description,
        //         },
        //         final_urls: [finalUrl]
        //     }
        // });

        res.json({ message: "client successfully created!", adId: customer });
    } catch (error) {
        console.error("Error creating Google Ads:", error);
        res.status(500).json({ error: "Failed to create ad on Google Ads API" });
    }
});


router.get('/track-ad/:adId', async (req, res) => {
    const { adId } = req.params;

    if (!adId) {
        return res.status(400).json({ error: "Ad ID is required" });
    }

    try {
        const query = `
            SELECT ad.id, ad_group.id, metrics.impressions, metrics.clicks, metrics.conversions
            FROM ad
            WHERE ad.id = ${adId}
        `;

        const response = await customer.query(query);

        if (!response.length) {
            return res.status(404).json({ error: "No data found for this ad ID" });
        }

        const adData = response[0];

        res.json({
            adId: adData.ad.id,
            adGroupId: adData.ad_group.id,
            impressions: adData.metrics.impressions,
            clicks: adData.metrics.clicks,
            conversions: adData.metrics.conversions
        });
    } catch (error) {
        console.error("Error tracking Google Ads:", error);
        res.status(500).json({ error: "Failed to track ad on Google Ads API" });
    }
});


export default router;