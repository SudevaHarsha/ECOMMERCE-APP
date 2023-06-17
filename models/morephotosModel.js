import mongoose from "mongoose";

const morephotosSchema =  new mongoose.Schema({
    product: {
        type: mongoose.ObjectId,
        ref: "Product",
        required: true,
      },
    morephoto1: {
        data: Buffer,
        contentType: String,
    },
    morephoto2: {
        data: Buffer,
        contentType: String,
      }
})

export default mongoose.model("Morephotos",morephotosSchema)