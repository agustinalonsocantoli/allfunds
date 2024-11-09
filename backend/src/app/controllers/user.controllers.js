import User from "../models/user.model"
import { CreateUserValidation } from "../validators/users.validator"
import { validateData } from "../services/validateData"

export class UserControllers {
    static async index(_req, res) {
        try {
            const users = await User.find()

            return res.status(200).json({
                data: users
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error: error
            })
        }
    }

    static async show(req, res) {
        try {
            const { id } = req.params

            const user = await User.findById(id)

            return res.status(200).json({
                data: user
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error: error
            })
        }
    }

    static async store(req, res) {
        try {
            const { data, error } = validateData(CreateUserValidation, req.body)

            if (error) return res.status(400).json({ message: error.message, error: error.error })

            const hashPassword = await argon2.hash(data.password)
            const createData = {
                ...data,
                password: hashPassword
            }

            const user = await User.create(createData)
            delete user.password

            return res.status(200).json({
                data: user
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error: error
            })
        }

    }
}