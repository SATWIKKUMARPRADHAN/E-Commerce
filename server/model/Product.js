import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true }, // Keep numeric ID for compatibility with frontend logic if needed, or rely on _id
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, default: 0 },
    image: { type: String, required: true },
    description: { type: String, required: true },
    originalPrice: { type: Number },
    discount: { type: Number },
    reviews: { type: Number, default: 0 },
    gender: { type: String }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
