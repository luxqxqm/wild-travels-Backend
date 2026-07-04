import { model, Schema } from "mongoose";

 const categorySchema = new Schema (
  {
    category: { type:String, required: true,}

});

export const Category = model('categorys', categorySchema);
