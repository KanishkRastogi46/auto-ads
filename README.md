# Ad Campaign Project

## Overview
The **Ad Campaign Project** is a web application that allows businesses to automate their ad campaigns using AI and the Google Ads API. The application includes:
- An AI-powered chatbot (using DeepSeek API) to collect business requirements.
- Integration with the Google Ads API to create and manage ad campaigns.
- A user-friendly React frontend for interaction and feedback.

---

## Features
1. **AI Chatbot**:
   - Collects business requirements (e.g., target audience, budget, ad duration).
   - Powered by the DeepSeek API for natural language processing.

2. **Google Ads Automation**:
   - Automatically creates ad campaigns based on user requirements.
   - Uses the Google Ads API for campaign management.

3. **User Feedback**:
   - Displays a popup to confirm user satisfaction with the generated campaign.
   - Allows users to modify requirements if unsatisfied.

4. **Real-Time Streaming**:
   - Streams responses from the DeepSeek API to the frontend in real-time.

5. **Secure Authentication**:
   - Supports Google Sign-In for secure user authentication.

---

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js (Express.js)
- **AI Chatbot**: DeepSeek API
- **Ad Automation**: Google Ads API
- **Authentication**: Google Identity Services
- **Database**: MongoDB (optional, for storing user data and campaign details)
- **Environment Management**: `.env` files for environment variables

---

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- Google Cloud account (for Google Ads API and OAuth credentials)
- DeepSeek API key

---

### Follow the below instructions to start the project
```bash
git clone https://github.com/your-username/auto-ads.git
cd auto-ads
cd backend
npm i
cd ../frontend
npm i
```
