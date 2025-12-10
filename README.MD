# 🎨 AI Meme Generator

An AI-powered meme generator built with 
- React (frontend)
- Node.js + Express (backend)
- HuggingFace Router API (image generation)

Users can describe any meme idea in text, and the app generates a high-quality AI image instantly.  
This project features a clean UI, responsive design, scroll handling for tall images, and downloadable output.

---

## 🚀 Features

### ✅ AI-Generated Memes  
Enter a description and instantly get a unique meme generated via HuggingFace Stable Diffusion XL.

### ✅ Fully Responsive UI  
The interface is centered, modern, and mobile-friendly.

### ✅ Auto Scroll for Large Images  
If the generated image is too tall, a smooth scroll container handles it.

### ✅ Download Button  
Users can download the generated meme as a `.png`.

### ✅ Enter Key Support  
Press **Enter** to generate memes quickly.

### ✅ Error Handling & Loading State  
Smooth UX with visual feedback.

---

## 🧰 Tech Stack

### Frontend  
- `React` (with modern hooks)
- `Axios` for API calls  
- Gradient UI styling

### Backend  
- `Node.js`  
- `Express.js`  
- `Axios`  
- `dotenv`

### AI  
- HuggingFace Router API  
  - Model used: **Stable Diffusion XL**

---

## 📂 Project Structure
```

meme-react/
|-- backend/
|   |-- server.js
|   |-- package.json
|   |-- package-lock.json
|   `-- .env
|
`-- vite-project/
    |-- src/
    |   `-- App.jsx
    |-- public/
    |-- package.json
    |-- package-lock.json
    `-- vite.config.js
```


---

## 🔧 Setup Instructions

### 1️⃣ Clone the repo

git clone <your-repo-link>
cd meme-react

---

## 2️⃣ Backend Setup

cd backend
npm install

### Create `.env`  

HF_API_KEY=your_huggingface_api_key

### Start backend

node server.js

Backend runs at:

http://localhost:5000


---

## 3️⃣ Frontend Setup

cd ../vite-project
npm install
npm run dev

Frontend runs at:

http://localhost:5173

---

## 🔌 API Endpoint (Backend)

**POST /generate**

Request body:

```json
{
  "prompt": "funny cat in sunglasses"
}
Response:

{
  "imageUrl": "data:image/png;base64,..."
}
