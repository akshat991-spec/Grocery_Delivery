# 🛒 GreenCart - Grocery Delivery App

GreenCart is a modern and responsive grocery delivery application built with a React.js frontend and a Node.js + Express.js backend. It allows users to browse, order, and track groceries seamlessly.

## 🌐 Live Demo

- 🔗 Frontend: [greencart-frontend](https://greencart-frontend-seven-iota.vercel.app/)
- 🔗 Backend API: [greencart-backend](https://greencart-backend-zeta-six.vercel.app/)

---

## 📦 Features

### ✅ Customer Features

- 🛍️ Browse grocery items with images, prices, and availability
- 🔎 Search and filter products
- ➕ Add items to cart
- 🧾 Place orders (Cash on Delivery supported)
- 🧑 User authentication

### ✅ Seller/Admin Features

- 🔐 Secure seller login
- 📦 Add and manage products with stock updates
- 📈 View customer orders

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Tailwind CSS
- React Router
- Context API / Redux (if used)

### Backend

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication
- Multer for image uploads
- cloudinary to store the images

---

## 🚀 Getting Started

### 📁 Clone the repositories

```bash
git clone https://github.com/akshat991-spec/Grocery_Delivery
cd Grocery_Delivery


PORT= 4000
MONGO_URL= "mongodb+srv://akshatchaturvedi991:Placebo991@cluster0.86qyjfl.mongodb.net"
JWT_SECRET= "secret#text"
```

To start the front end:
npm run dev

To start the Back end:
npm run server

NOTE: verions of the techs used

"dependencies":
{
"@tailwindcss/vite": "^4.1.10",
"axios": "^1.10.0",
"create": "^0.5.5",
"react": "^19.1.0",
"react-dom": "^19.1.0",
"react-hot-toast": "^2.5.2",
"react-router-dom": "^7.6.3",
"tailwindcss": "^4.1.10"
},
"devDependencies": {
"@eslint/js": "^9.25.0",
"@types/react": "^19.1.2",
"@types/react-dom": "^19.1.2",
"@vitejs/plugin-react": "^4.4.1",
"eslint": "^9.25.0",
"eslint-plugin-react-hooks": "^5.2.0",
"eslint-plugin-react-refresh": "^0.4.19",
"globals": "^16.0.0",
"vite": "^6.3.5"
}
