import News from '../models/new.model.js'
import { validateData } from '../services/validateData.js'
import { UpdateNewsValidator, CreateNewsValidator } from '../validators/news.validator.js'

export class NewControllers {
    static async index(req, res) {
        try {
            const { sortBy = 'createdAt', sortOrder = 'desc', archives = false } = req.query

            const news = await News.find(!archives ? { archiveDate: null } : {})
                .sort({ [sortBy]: sortOrder })
                .populate('author', 'name')

            return res.status(200).json({
                data: news
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

            const news = await News.findById(id).populate('author', 'name')

            return res.status(200).json({
                data: news
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
            const { data, error } = validateData(CreateNewsValidator, req.body)

            if (error) return res.status(400).json({ message: error.message, error: error.error })
            if (!req.user) return res.status(404).json({ message: "User not found" })

            let updateData = data
            const urlImage = data.image

            updateData = {
                ...updateData,
                image: urlImage,
                author: req.user
            }

            const news = await News.create(updateData)

            return res.status(201).json({
                data: news
            })

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error: error
            })
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params

            const { data, error } = validateData(UpdateNewsValidator, req.body)

            if (error) return res.status(400).json({ message: error.message, error: error.error })

            const updateData = data?.archived ? { archiveDate: new Date() } : { archiveDate: null }
            const news = await News.findByIdAndUpdate(id, updateData)

            return res.status(200).json({
                data: news
            })

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error: error
            })
        }
    }

    static async destroy(req, res) {
        try {
            const { id } = req.params

            await News.findByIdAndDelete(id)

            return res.status(200).json({ message: "News deleted succesfully" })
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error: error
            })
        }
    }
}