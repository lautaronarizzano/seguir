import cartsModel from "../models/cartsModel.js";
export default class Carts {
    constructor() {
        console.log('Working carts with DB in mongoDB')
    }

    getCarts = async () => {
        const carts = await cartsModel.find()
        return carts
    }

    getCartById = async (id) => {
        const result = await cartsModel.find({
            _id: id
        })
        return result
    }

    addCart = async (cart) => {
        const result = await cartsModel.create(cart)
        return result
    }

    addProductInCart = async (cid, pid) => {
        const cart = await cartsModel.findById(cid)
        const cartObject = cart.toObject()

        const addPost = async (post) =>{
            const existingPost = cartObject.products.find(p => p.product === post);
            if (existingPost) {

                // Actualizar post existente

                existingPost.product = pid;

                existingPost.quantity += 1;

                return
            } else {

                // Agregar nuevo post
                const result = await cartsModel.create({
                    product: post,
                    quantity:1
                })
                return result
            }
        }
        addPost(pid)
    }
}
