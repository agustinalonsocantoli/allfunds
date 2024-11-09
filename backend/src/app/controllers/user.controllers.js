import User from "../models/user.model.js"
import { CreateUserValidation } from "../validators/users.validator.js"
import { validateData } from "../services/validateData.js"

export default class UserControllers {
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

    static async create(req, res) {
        try {
            const { data, error } = await validateData(CreateUserValidation, req.body)

            if (error) return res.status(400).json({ message: error.message, error: error.error })

            const user = await User.create(data)

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