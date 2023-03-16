import { Router } from 'express'
import Carts from '../../dao/dbManagers/carts.js'

const cartsManager = new Carts()
const router = Router()

router.get('/', async (req, res) => {
    try {
        const carts = await cartsManager.getCarts()
        res.send({status: 'success', payload: carts})
    } catch (error) {
        res.status(500).send({ error })
    }
})

router.post('/', async (req, res) => {
    const cart = req.body
    try {
        const result = await cartsManager.addCart(cart)
        res.send({status: 'success', payload: result})
    } catch (error) {
        res.status(500).send({ error })
    }
})

router.get('/:cid', async (req, res) => {
    const cid = req.params.cid
    try {
        const result = await cartsManager.getCartById(cid)
        res.send({status: 'success', payload: result})
    } catch (error) {
        res.status(500).send({ error })
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    try {
        const result = await cartsManager.addProductInCart(cid, pid)
        res.send({status: 'success', payload: result})
    } catch (error) {
        res.status(500).send({error: 'el error es ' + error})
    }

})
export default router