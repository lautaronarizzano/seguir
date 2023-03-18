import { Router } from 'express'
import Products from '../../dao/dbManagers/products.js'
import Carts from '../../dao/dbManagers/carts.js'

const productsManager = new Products()
const cartsManager = new Carts()

const router = Router()

router.get('/', async (req, res) => {
    const products = await productsManager.getProducts()
    res.render('index', {products})
})

router.get('/carts/:cid', async (req, res) => {
    let cartId = req.params.cid;
    try {
        let cartProm = await cartsManager.getCartById(cartId); 
    let cartArray = cartProm.products; 
    let cartProducts = cartArray.map(function(productObj){
        // validarUrlIndividual(productObj.product);
        return productObj = {title:productObj.product.title, description:productObj.product.description,
            code:productObj.product.code, quantity:productObj.quantity, price:productObj.product.price}
    })
    res.render('carts',{cartProducts})
    } catch (error) {
        console.log('el error es: ' + error)
    }

}
)

export default router