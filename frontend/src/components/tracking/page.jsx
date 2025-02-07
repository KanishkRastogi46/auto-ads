import { useState, useEffect } from "react";
import axios from "axios";

  
export default function TrackCampaigns() {
const [campaigns, setCampaigns] = useState([]);

useEffect(() => {
    const fetchCampaigns = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/ads/track-ad/${adId}`);
        setCampaigns(response.data);
    } catch (error) {
        console.error("Error fetching campaigns", error);
    }
    };
    fetchCampaigns();
}, []);

return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
    <h2 className="text-xl font-bold mb-4">Track Ad Campaigns</h2>
    {campaigns.length === 0 ? <p>No campaigns available.</p> : (
        <ul className="space-y-2">
        {campaigns.map((campaign, index) => (
            <li key={index} className="p-3 bg-gray-100 rounded">
            <p className="font-bold">{campaign.name}</p>
            <p>Budget: ${campaign.budget}</p>
            <p>Audience: {campaign.audience}</p>
            </li>
        ))}
        </ul>
    )}
    </div>
);
}
  