import mongoose from "mongoose";
import Product from "../models/Product.js";

const seedProducts = [
  {
    name: "Potato 500g",
    category: "Vegetables",
    price: 25,
    offerPrice: 20,
    image: ["https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80"],
    description: ["Fresh and organic", "Rich in carbohydrates", "Ideal for curries and fries"],
    inStock: true
  },
  {
    name: "Tomato 1 kg",
    category: "Vegetables",
    price: 40,
    offerPrice: 35,
    image: ["https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=600&q=80"],
    description: ["Juicy and ripe", "Rich in Vitamin C", "Perfect for salads and sauces"],
    inStock: true
  },
  {
    name: "Carrot 500g",
    category: "Vegetables",
    price: 30,
    offerPrice: 28,
    image: ["https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80"],
    description: ["Sweet and crunchy", "Good for eyesight", "Ideal for juices and salads"],
    inStock: true
  },
  {
    name: "Apple 1 kg",
    category: "Fruits",
    price: 120,
    offerPrice: 110,
    image: ["https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80"],
    description: ["Crisp and juicy", "Rich in fiber", "Organic and farm fresh"],
    inStock: true
  },
  {
    name: "Banana 1 kg",
    category: "Fruits",
    price: 50,
    offerPrice: 45,
    image: ["https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80"],
    description: ["Sweet and ripe", "High in potassium", "Great for smoothies and snacking"],
    inStock: true
  },
  {
    name: "Amul Milk 1L",
    category: "Dairy",
    price: 60,
    offerPrice: 55,
    image: ["https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80"],
    description: ["Pure and fresh", "Rich in calcium", "Ideal for tea, coffee, and desserts"],
    inStock: true
  },
  {
    name: "Paneer 200g",
    category: "Dairy",
    price: 90,
    offerPrice: 85,
    image: ["https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"],
    description: ["Soft and fresh", "Rich in protein", "Ideal for curries and snacks"],
    inStock: true
  },
  {
    name: "Coca-Cola 1.5L",
    category: "Drinks",
    price: 80,
    offerPrice: 75,
    image: ["https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"],
    description: ["Refreshing and fizzy", "Best served chilled"],
    inStock: true
  },
  {
    name: "Pepsi 1.5L",
    category: "Drinks",
    price: 78,
    offerPrice: 73,
    image: ["https://images.unsplash.com/photo-1546111380-cfca9a43dd85?auto=format&fit=crop&w=600&q=80"],
    description: ["Chilled and refreshing", "Best served cold"],
    inStock: true
  },
  {
    name: "Basmati Rice 5kg",
    category: "Grains",
    price: 550,
    offerPrice: 520,
    image: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80"],
    description: ["Long grain and aromatic", "Premium quality"],
    inStock: true
  },
  {
    name: "Brown Bread 400g",
    category: "Bakery",
    price: 40,
    offerPrice: 35,
    image: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"],
    description: ["Soft and healthy", "Made from whole wheat"],
    inStock: true
  },
  {
    name: "Maggi Noodles 280g",
    category: "Instant",
    price: 55,
    offerPrice: 50,
    image: ["https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80"],
    description: ["Instant and easy to cook", "Delicious taste"],
    inStock: true
  }
];

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connected"));
        
        let connectionString = `${process.env.MONGODB_URI}/greencart`;
        
        if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes("cluster0.86qyjfl.mongodb.net")) {
            console.log("MongoDB Atlas URI is invalid or missing. Starting local in-memory MongoDB server...");
            const { MongoMemoryServer } = await import('mongodb-memory-server');
            const mongoServer = await MongoMemoryServer.create();
            connectionString = mongoServer.getUri();
            console.log(`In-memory MongoDB started at: ${connectionString}`);
            global.mongoServer = mongoServer;
        }

        await mongoose.connect(connectionString);

        // Seed default products if database is empty
        const count = await Product.countDocuments();
        if (count === 0) {
            console.log("Seeding default products into the database...");
            await Product.insertMany(seedProducts);
            console.log("Seeding completed successfully!");
        }
    }
    catch (error) {
        console.error("Database connection/seeding error:", error.message);
    }
}

export default connectDB;
