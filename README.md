# local-democracy-platform || 🗳️ Local Democracy Engagement Platform
> A system that makes local government accessible and impactful:  - Real-time notifications about issues affecting your specific neighborhood - Plain language summaries of proposed local legislation - Direct feedback channels to representatives with public response tracking - Community voting features that aggregate constituent opinions 
# Product :
> A web application to empower local citizens by providing real-time neighborhood alerts, simplified summaries of legislative proposals, and a platform to vote and express opinions on local laws.

🚀 Features
✅ Real-time Neighborhood Alerts via Socket.IO

✅ AI-powered Legislation Summarizer using OpenAI (mock mode supported)

✅ View Proposed Legislation with plain-language summaries

✅ Community Voting Feature (Submit and aggregate public opinion)

✅ Location-aware Alerts (Planned)

✅ Admin Alert Broadcasting (Planned)

🛠️ Tech Stack
# Layer	            # Tech-Stacks
Frontend	       React, Tailwind CSS
Backend	           Node.js, Express.js
Realtime	       Socket.IO
AI	               OpenAI API (GPT-3.5-turbo)
Database	       MongoDB (via Mongoose)
Dev Tools	       dotenv, concurrently (optional)

🧩 Project Structure

project-root/
├── backend/
│   ├── models/
│   │   └── Alert.js
│   ├── routes/
│   │   └── legislation.js
│   ├── server.js or index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── LegislationList.jsx
│   │   └── App.jsx
│   └── package.json
├── .env
├── README.md

🧪 How to Run

🧩 Backend Setup
cd server
npm install

Run server:
node index.js

💻 Frontend Setup

cd client
npm install
npm run dev

📡 API Endpoints
Endpoint	                   Method	Description
/api/legislation/summarize	   POST	     Send originalText → returns summary
/api/legislation/all	        GET	     Returns list of dummy (or DB) laws
Socket.io	-	                          Real-time alerts via receive_alert

🧠 AI Summary Example

{
  "originalText": "This bill aims to improve water conservation...",
  "summary": "This legislation proposes new guidelines to improve water management and transparency..."
}
🧱 To Do / Planned Features
 Admin Login for Alert Control

 Location-Based Filtering for Alerts

 Voting Dashboard with Analytics

 Persist legislation in MongoDB (instead of mock)

 User authentication (optional via Firebase or JWT)
 

🤝 Contributors
👤 Anuj — Project Manager & Developer

🤖 ChatGPT — Coding Partner 😉