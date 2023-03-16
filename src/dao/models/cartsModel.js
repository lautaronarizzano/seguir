import mongoose from "mongoose";

const cartsCollection = 'carts'

// const cartsSchema = new mongoose.Schema({
//     products: {
//         type: Array
        
//     }
// })
// const cartsSchema = new mongoose.Schema({
//     products: {
//         type: [
//             {
//                 product: {
//                     type: mongoose.Schema.Types.ObjectId,
//                     ref: 'products'
//                 }
//             }
//         ],
//         default: []

//     }
// })

const cartSchema = mongoose.Schema({
    products:{
        type: [
        {            
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'products'
            },
            quantity:Number
        }
        ],
        default:[]
    }
})

const cartsModel = mongoose.model(cartsCollection, cartSchema)

export default cartsModel 
