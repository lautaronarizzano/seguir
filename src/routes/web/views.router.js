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

router.get('/', async (req, res) => {
    const carts = await cartsManager.getCarts()
    res.render('carts', {carts})
})

export default router