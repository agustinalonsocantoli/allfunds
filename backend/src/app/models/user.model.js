import { Schema, model } from 'mongoose'
import argon2 from 'argon2'

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: false,
        versionKey: false
    }
)

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await argon2.hash(this.password)

        next()
    }
    else next()
})

const User = model('User', userSchema)

export default User