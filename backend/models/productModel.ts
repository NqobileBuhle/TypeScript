import mongoose from "mongoose";

export interface ProductDocument extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  image:string;
  user: mongoose.Types.ObjectId; // Reference to the user who created it
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image:{type:String,required:true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model<ProductDocument>("Product", productSchema);
export default Product;
