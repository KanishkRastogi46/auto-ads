import { useState, useEffect } from "react";
import axios from "axios";


export default function CreateAdCampaign() {
    const [campaignData, setCampaignData] = useState({ name: "", budget: "", audience: "" });
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:3000/ads/create-ad", campaignData);
        alert("Campaign Created Successfully!");
      } catch (error) {
        console.error("Error creating campaign", error);
      }
    };
    
    return (
      <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Create Ad Campaign</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Campaign Name" className="w-full p-2 border rounded" value={campaignData.name} onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })} />
          <input type="number" placeholder="Budget" className="w-full p-2 border rounded" value={campaignData.budget} onChange={(e) => setCampaignData({ ...campaignData, budget: e.target.value })} />
          <input type="text" placeholder="Target Audience" className="w-full p-2 border rounded" value={campaignData.audience} onChange={(e) => setCampaignData({ ...campaignData, audience: e.target.value })} />
          <button type="submit" className="p-2 bg-green-500 text-white rounded hover:bg-green-600">Create Campaign</button>
        </form>
      </div>
    );
}