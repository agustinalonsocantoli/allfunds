import expressLoader from './config/loader.js'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'

dotenv.config()

const main = async () => {
    try {
        const app = await expressLoader()
        await connectDB()

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error.message)
    }
}

main()