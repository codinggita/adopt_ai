# 🚀 AdOpt AI

AdOpt AI is a full-stack MERN SaaS platform that helps small businesses optimize their digital advertising campaigns using AI-driven insights and analytics.

deploy link :https://adopt-ai-ten.vercel.app/
---

## 📌 Problem

Small businesses and startups often struggle with digital advertising because:

- Ad platforms like Google Ads and Meta Ads are complex
- No clear guidance on improving performance
- Limited budget leads to high risk
- 26–40% of ad spend is wasted due to poor optimization

---

## 💡 Solution

AdOpt AI simplifies ad optimization by:

- Providing a unified dashboard for all campaign metrics
- Using AI (OpenAI) to generate actionable insights
- Helping users reduce wasted ad spend
- Offering real-time alerts and analytics

---

## 🎯 Key Features

### 🔐 Authentication
- JWT-based authentication
- Google OAuth login

### 📊 Dashboard
- KPI cards (Spend, Clicks, ROI, Conversions)
- Interactive charts (Recharts)
- Campaign performance overview

### 📈 Campaign Management
- Create, update, delete campaigns
- Campaign health score
- Filtering & search

### 🤖 AI Insights
- AI-generated campaign suggestions
- Accept / dismiss insights
- Insight history tracking

### 📁 File Upload
- Upload ad creatives (images/videos)
- Cloudinary integration
- Preview & manage files

### 🔔 Notifications
- Budget alerts
- Performance alerts
- Toast notifications

### 🌙 Theme System
- Light / Dark mode
- Stored in localStorage

### 🔍 SEO
- Dynamic meta tags
- Sitemap & robots.txt

### 📊 Analytics
- Google Analytics (GA4) integration
- Event tracking

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- MUI (Material UI)
- Redux Toolkit
- React Router
- Formik + Yup

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

### Integrations
- OpenAI API
- Cloudinary
- Google OAuth
- Google Analytics (GA4)

---

## 📂 Project Structure
adopt-ai/
│
├── client/        # Frontend (React)
├── server/        # Backend (Node/Express)
├── README.md
└── .gitignore

### Client Structure
client/
└── src/
├── assets/
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Modal.jsx
│   └── layout/
│       ├── Navbar.jsx
│       ├── Sidebar.jsx
│       └── DashboardLayout.jsx
├── pages/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── dashboard/
│   │   └── Dashboard.jsx
│   ├── campaign/
│   │   ├── CampaignList.jsx
│   │   └── CampaignDetail.jsx
│   └── ai/
│       └── Insights.jsx
├── features/
│   ├── auth/authSlice.js
│   ├── campaign/campaignSlice.js
│   ├── ai/aiSlice.js
│   └── ui/uiSlice.js
├── hooks/
│   ├── useAuth.js
│   ├── useDebounce.js
│   └── useTheme.js
├── services/
│   ├── api.js
│   ├── authService.js
│   └── campaignService.js
├── utils/
│   ├── storage.js
│   └── constants.js
├── routes/
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
├── store/store.js
├── App.jsx
├── main.jsx
└── index.css

### Server Structure
server/
├── config/
│   ├── db.js
│   └── cloudinary.js
├── models/
│   ├── User.js
│   ├── Campaign.js
│   ├── Insight.js
│   └── Notification.js
├── controllers/
│   ├── auth.controller.js
│   ├── campaign.controller.js
│   ├── ai.controller.js
│   ├── upload.controller.js
│   └── notification.controller.js
├── routes/
│   ├── auth.routes.js
│   ├── campaign.routes.js
│   ├── ai.routes.js
│   ├── upload.routes.js
│   ├── notification.routes.js
│   └── index.js
├── middleware/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── upload.middleware.js
├── services/
│   ├── ai.service.js
│   └── notification.service.js
├── utils/
│   ├── jwt.js
│   └── logger.js
├── server.js
├── app.js
└── .env

---

## 🔄 Backend MVC Flow
Route → Controller → Service → Model → DB
Example:
POST /campaigns
→ campaign.routes.js
→ campaign.controller.js
→ campaign.service.js
→ Campaign model
→ MongoDB

---

## ⚙️ Getting Started

### 1. Clone the repository
git clone https://github.com/your-username/adopt-ai.git
cd adopt-ai

### 2. Setup Backend
cd server
npm install
cp .env.example .env
Fill in your environment variables
npm run dev

### 3. Setup Frontend
cd client
npm install
npm run dev


## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Author

Built with ❤️ by Hemang singh solanki
