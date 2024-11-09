import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import authRoutes from '../routes/auth.routes.js'
import userRoutes from '../routes/user.routes.js'
import newsRoutes from '../routes/new.routes.js'

const expressLoader = async () => {
    const app = express()

    app.use(morgan('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(helmet())
    app.use(cors({ origin: '*' }))

    const routes = [authRoutes, userRoutes, newsRoutes]

    routes?.map((route) => app.use('/v1', route))

    return app
}

export default expressLoader