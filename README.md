# 🌍 Angular + NestJS Currency Converter

A **full-stack currency converter** built with **Angular 19** (frontend) and **NestJS 10** (backend).  
It uses the [FreeCurrencyAPI](https://freecurrencyapi.com/docs/) to provide **real-time** and **historical exchange rates** between global currencies.

---

## 🔗 Live Demo
- **Frontend (Angular App):** [https://currency-testing.netlify.app/](https://currency-testing.netlify.app/)
- **Backend (NestJS API):** [https://currency-project-9od0.onrender.com](https://currency-project-9od0.onrender.com)
- **GitHub Repository:** [https://github.com/Usmanaftab4u/currency-project](https://github.com/Usmanaftab4u/currency-project)

---

## 💡 Features
✅ **Dynamic Currency Conversion** – convert between any two supported currencies using live rates  
✅ **Historical Conversion** – select a past date to fetch that day’s exchange rate  
✅ **Conversion History** – all conversions are stored locally and persist even after reloading  
✅ **Mobile-first Design** – fully responsive layout using Angular Material  
✅ **Server-side Security** – API key securely stored on NestJS backend (not exposed in frontend)  
✅ **CORS-enabled API** – backend configured for Netlify + localhost origins

---

## 🧩 Tech Stack
**Frontend:** Angular 19, Angular Material, TypeScript  
**Backend:** NestJS 10, Node.js  
**Hosting:** Netlify (Frontend) + Render (Backend)  
**API Provider:** [FreeCurrencyAPI](https://freecurrencyapi.com/)

---

## 🧪 How to Test
1. Visit the live app → [currency-testing.netlify.app](https://currency-testing.netlify.app/)  
2. Select currencies from **From** and **To** dropdowns  
3. Enter an **Amount** (e.g., `15`)  
4. *(Optional)* pick a **Historical Date** to test older rates  
5. Click **Convert** → Result appears below  
6. Click **History** tab to see previous conversions (stored in localStorage)

> **Note:**  
> Backend is hosted on Render’s free plan — it may take a few seconds to wake up after inactivity.

---

## ⚙️ Local Development

### 🖥 Clone and Setup
```bash
# Clone repository
git clone https://github.com/Usmanaftab4u/currency-project
cd currency-project
```

### 🚀 Backend (NestJS)
```bash
cd backend
npm install
npm run start:dev
```

### 🌐 Frontend (Angular)
```bash
cd ../frontend
npm install
ng serve
```

App will be running at: [http://localhost:4200](http://localhost:4200)

---

## 🔒 Environment Variables (Backend)

Create a `.env` file inside `/backend`:
```env
PORT=3000
BASE_URL=https://api.freecurrencyapi.com/v1
CURRENCY_API_KEY=your_api_key_here
```

---

## 🧠 API Endpoints
| Endpoint | Method | Description |
|-----------|--------|-------------|
| `/api/currencies` | GET | Get all supported currencies |
| `/api/convert` | GET | Convert between currencies (supports optional `date` query for historical rate) |

---

## 🧑‍💻 Developer
**Author:** Usman Aftab  
**GitHub:** [@Usmanaftab4u](https://github.com/Usmanaftab4u)

---

## 🏁 Notes
- Frontend hosted on **Netlify**  
- Backend hosted on **Render**  
- CORS configured for both Netlify and localhost origins  
- This project was built as a **technical assessment** to demonstrate full-stack deployment and API integration.
