import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../app/models/user.model.js'
import News from '../app/models/new.model.js'

dotenv.config()
const dbURL = process.env.DB_URL

export const connectDB = async () => {
    try {
        await mongoose.connect(dbURL)

        await User.createCollection()
        await News.createCollection()

        console.log('Database connected')
    } catch (error) {
        console.log(error)
    }
}