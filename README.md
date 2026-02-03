# 🐾 Ethio-Pet-App (PetConnect)

A **production-grade pet marketplace platform** built for the Ethiopian market, enabling buyers to discover pets from verified sellers and sellers to manage listings, orders, and communication — across **mobile (React Native)** with a scalable **Node.js backend**.

This project is **UI-accurate, backend-driven, and system-design aware**.  
It is not a prototype or demo.

---

## 📌 Project Status

- ✅ UI designs completed via Stitch AI (17 mobile screens)
- ✅ HTML + PNG references stored locally
- 🚧 Frontend (React Native) under active development
- 🚧 Backend (NestJS) under active development

---

## 🎯 Product Vision

Ethio-Pet-App digitizes traditional pet selling into a **trusted, transparent, and humane marketplace** where:

- Buyers can safely browse, reserve, and pay for pets
- Sellers can manage listings, orders, and earnings
- Communication is clear and traceable
- The system is scalable, secure, and production-ready

---

## 🧱 Monorepo Structure

Ethio-Pet-App/
├── Frontend/ # React Native mobile application
├── Backend/ # NestJS backend API
├── EthioPet UI/ # READ-ONLY Stitch AI designs (HTML + PNG)
└── README.md


---

## 🎨 UI Source of Truth (IMPORTANT)

All UI screens are already designed and **must be replicated exactly**.

📁 Location:
EthioPet UI/
└── [17 screen folders]
├── code.html # Layout & styling reference
└── screen.png # Visual reference


### UI Rules
- `screen.png` = visual truth
- `code.html` = layout & spacing truth
- React Native implementation must match **pixel-by-pixel**
- No visual deviation without explicit justification

---

## 📱 Frontend — Mobile App

### Tech Stack

- **React Native (Expo)**
- **TypeScript**
- **React Navigation**
- **react-native-reanimated**
- **react-native-gesture-handler**
- **react-native-safe-area-context**
- **Axios**
- **Zustand / Redux Toolkit**
- **Expo Vector Icons**

---

### 🚨 Safe Area Enforcement (MANDATORY)

For **all authenticated screens with bottom navigation**:

- Must use `SafeAreaView`
- Must respect:
  - Notches
  - Home indicators
  - Gesture areas
- Must NOT allow bottom tabs to overlap content

Example:
```tsx
<SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
  {/* Screen Content */}
</SafeAreaView>
This rule is non-negotiable.

Navigation Structure
Public (Unauthenticated)
Splash

Onboarding

Login

Register

Authenticated (Buyer / Seller)
Bottom Tab Navigation:

Home

Explore

Favorites

Orders / Dashboard

Profile

Frontend Folder Structure (Expected)
Frontend/
├── src/
│   ├── components/
│   ├── navigation/
│   ├── screens/
│   ├── services/      # API calls
│   ├── store/         # Global state
│   ├── theme/
│   └── utils/
└── app.json / expo config
🧠 Backend — API & System Design
Backend Stack (Chosen for Scalability)
Node.js

NestJS

TypeScript

PostgreSQL

Prisma ORM

JWT Authentication

Role-Based Access Control

WebSockets (Chat)

Redis (optional)

Cloudinary / S3 (Images)

Why NestJS?
Strong modular architecture

Excellent TypeScript support

Clean separation of concerns

Scales well for:

Auth

Orders

Messaging

Notifications

Backend Folder Structure (Expected)
Backend/
├── src/
│   ├── modules/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── middleware/
│   └── utils/
└── prisma/
🔐 Core Backend Modules (Mapped to UI)
Auth Module

Login / Register

Role selection (Buyer / Seller)

JWT & refresh tokens

User Module

Profile

Preferences

Saved pets

Pet Module

Listings

Pet details

Filters

Favorites Module

Save / unsave pets

Order / Reservation Module

Cart

Reservation steps

Order tracking timeline

Payment Module

Payment method selection

Transaction records

Mock gateway (initially)

Chat Module

Buyer ↔ Seller messaging

WebSocket-based

Persistent message history

Seller Module

Dashboard stats

Listings

Earnings

Admin Module (Future)

Approvals

Moderation

Reports

🔄 Engineering Rule (STRICT)
A feature is NOT complete unless it includes:

Data model

API endpoint

Backend logic

Frontend integration

Error & loading handling

Safe-area compliant UI (if applicable)

🎯 Design Language Summary
Soft greens → health & care

Calming blues → trust & reliability

Warm beige → comfort & friendliness

Yellow / orange → action highlights

UI must feel:

Friendly

Professional

Humane

Trustworthy

🚀 Development Philosophy
Production-first thinking

Explicit system design

Strong typing everywhere

UI accuracy over speed

Scalability and security by default

🧪 Not Included (Yet)
Web app (Next.js)

Admin web dashboard

Real payment gateway

Push notifications

These are planned, not forgotten.

📎 Notes for AI Coding Assistants
Always read EthioPet UI/ before coding screens

Do not invent UI

Do not ignore safe areas

Prefer clarity over cleverness

Ask before refactoring shared architecture

📍 Final Note
This project is designed to reflect real-world engineering, not tutorial shortcuts.

Every decision should be intentional, explainable, and scalable.

Owner: Ethio-Pet-App
Status: Active Development
Target Platform: Mobile (React Native)
Market: Ethiopia 🇪🇹