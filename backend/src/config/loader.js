import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'

const expressLoader = async () => {
    const app = express()

    app.use(morgan('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(helmet())
    app.use(cors({ origin: '*' }))

    return app
}

export default expressLoader
