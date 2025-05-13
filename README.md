# 🧠 Descomplica – Retail Intelligence for Everyone

Descomplica is a modern, scalable **Progressive Web Application (PWA)** built with **Next.js**, designed to bridge the data gap between **small retailers** and the **industry**. The platform offers a simple and accessible way for retailers to submit sell-out data (via chatbot, OCR, or manual input), while empowering industry analysts with intelligent dashboards and actionable insights.

---

## 🚀 Project Overview

This application is part of the **FIAP Challenge 2025**, proposed by **Astéria**. The core idea is to bring **data visibility** and **engagement** to small retail stores through gamification and smart BI tools.

- 📱 **Retailer Side**: Easy data submission (photo OCR, chatbot, form)
- 📊 **Industry Side**: Full-featured dashboard for analysis, campaigns, and engagement tracking
- 🎮 **Gamification**: Leaderboards and engagement scores
- 🧩 **Modular, role-based architecture**

---

## 🧰 Technology Stack

### 🖥️ Core Technologies

- **Framework**: [Next.js 15.2.4](https://nextjs.org/)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Date Handling**: date-fns
- **UI Components**: Radix UI primitives + shadcn/ui
- **Notifications**: Sonner

### ⚙️ Dev Tools

- Prettier (code formatting)
- PostCSS
- Tailwind CSS (utility-first styling)
- pnpm (package manager)

---

## 📁 Project Structure

```
src/
├── app/                # Next.js App Router
│   ├── auth/           # Auth pages (login/register)
│   ├── industry/       # Industry dashboard and tools
│   ├── retailer/       # Retailer dashboard and tools
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Landing page
├── components/         # Shared and reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configuration
├── provider/           # Context providers
└── styles/             # Global CSS and Tailwind config
```

---

## ✨ Key Features

### ✅ General

- PWA-ready (installable, offline-first)
- Light/Dark mode support
- Responsive design (mobile-first)
- Role-based access (Retailer / Industry)

### 🛒 Retailer Portal

- Sell-out data submission via:
    - 📷 OCR photo upload
    - 💬 Chatbot interaction
    - 📝 Manual form
    - 📂 CSV/Excel file upload
- History of submissions
- Gamification: points, engagement score, leaderboard
- Notifications and campaign alerts

### 🏢 Industry Portal

- Sell-out analytics (by region, product, date, retailer)
- BI dashboard with charts
- Retailer engagement insights
- Campaign management interface
- Downloadable reports
- AI-powered insights (planned)

---

## 📦 Getting Started

### 🔧 Prerequisites

- Node.js (LTS version recommended)
- `pnpm` package manager

### 💻 Installation

```bash
git clone https://github.com/your-org/descomplica.git
cd descomplica
pnpm install
```

### ▶️ Running the App

```bash
pnpm dev       # Start development server
pnpm build     # Build for production
pnpm start     # Start production server
pnpm prettier  # Format codebase
```

---

## 🧱 Architecture

- **Next.js App Router** with `/auth`, `/industry`, `/retailer`
- Component-based design with co-location
- Global state managed via React Context + custom hooks
- Form logic centralized using `React Hook Form` + `Zod`
- Charts via Recharts, date logic via `date-fns`
- Dark mode via `next-themes`

---

## 🛡️ Security Considerations

- Role-based access control
- Form validation and sanitization
- Authentication handling (planned integration with OAuth or JWT)

---

## 🚀 Performance Optimizations

- Image optimization with Next.js
- Code splitting by route/component
- CSS optimizations with Tailwind JIT
- Lazy-loaded charts and large components

---

## 🤝 Contributing

Feel free to fork the project and submit a PR. Coming soon: detailed contributing guide and component documentation.

---

## 📄 License

MIT License – see [LICENSE](./LICENSE)

---

## 📬 Contact

For feedback or inquiries about the project:

- 📧 giantcard5.dev@outlook.com
- 💼 [LinkedIn](https://www.linkedin.com/in/renato-soares-b5019a1b9/)

---

### ✨ Made with ❤️ by Renato Soares
