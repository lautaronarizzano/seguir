import mongoose from "mongoose";

const cartCollection = 'cart'

const cartSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    quantity: {
        type: Number
    }
})
const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel

