import {
    Router
} from 'express'
import userModel from '../../dao/models/users.model.js'

const router = Router()

router.post('/register', async (req, res) => {
    const {
        first_name,
        last_name,
        email,
        age,
        password
    } = req.body;

    try {
        const exists = await userModel.findOne({
            email
        })

        if (exists) return res.status(400).send({
            status: 'error',
            error: 'user already exists'
        })

        const user = {
            first_name,
            last_name,
            email,
            age,
            password,
            rol: email.includes('admin') && password.includes('admin') ? 'admin' : 'user'
        }

        // if (user.email.includes('admin') && user.password.includes('admin')) {
        //     user.rol = 'admin'
        // } else {
        //     user.rol = 'user'
        // }

        await userModel.create(user)

        res.send({
            status: 'success',
            message: 'user registered'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'error',
            error
        })
    }
})

router.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body

    try {
        const user = await userModel.findOne({
            email,
            password
        })
        if (!user) return res.status(400).send({
            status: 'error',
            error: 'incorrect credentials'
        })

        req.session.user = {
            name: `${user.first_name}  ${user.last_name}`,
            email: user.email,
            age: user.age,
            rol: user.rol
        }

        res.send({
            status: 'success',
            message: 'login success'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'error',
            error
        })
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({
            status: 'error',
            error: "couldn't logout"
        })
        res.redirect('/login')
    })
})

export default router