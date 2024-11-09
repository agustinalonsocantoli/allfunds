import { LoginValidator } from "../validators/auth.validator"
import { validateData } from "../services/validateData";
import User from "../models/user.model";
import argon2 from "argon2"
import jwt from "jsonwebtoken"

export class AuthControllers {
    static async login(req, res) {
        try {
            const { data, error } = validateData(LoginValidator, req.body)

            if (error) return res.status(400).json({ message: error.message, error: error.error })

            const user = await User.findOne({ email: data.email })

            if (user) return res.status(404).json({ message: "User not found" })

            const verifyPassword = await argon2.verify(user?.password, data?.password)

            if (!verifyPassword) return res.status(401).json({ message: "Invalid email or password" })

            const token = jwt.sign({ id: user?.id }, process.env.TOKEN_SECRET_KEY, { expiresIn: '5d' })
            delete user.password

            return res.status(200).json({
                token,
                user
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error: error
            })
        }
    }
}