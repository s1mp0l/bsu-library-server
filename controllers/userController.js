const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const {User, BookDetails} = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJWT = (id, email, role) => {
    return jwt.sign(
        {
            id,
            email,
            role
        },
        process.env.SECRET_KEY,
        {
            expiresIn: '24h'
        }
    )
}

class UserController {
    async registration(req, res, next) {
        const {
            email,
            password,
            name,
            surname,
        } = req.body
        const role = "USER"

        if (!email) {
            return next(ApiError.badRequest('Некорректный email'))
        }
        if (!password) {
            return next(ApiError.badRequest('Некорректный пароль'))
        }

        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const hashedPass = await bcrypt.hash(password, 5)
        const user = await User.create({
            email,
            password: hashedPass,
            name,
            surname,
            role
        })

        const token = generateJWT(user.id, email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неправильный пароль'))
        }

        const token = generateJWT(user.id, email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getUser(req, res, next) {
        try {
            const {id} = req.params
            const detail = await User.findOne({
                where: { id }
            })
            return res.json(detail)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()