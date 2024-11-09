import News from '../models/new.model.js'
import { validateData, validateImage } from '../services/validateData.js'
import { UpdateNewsValidator, CreateNewsValidator } from '../validators/news.validator.js'
import { uploadImageCloudinary } from '../services/uploadImage.js'

class NewControllers {
    static async index(req, res) {
        try {
            const { sortBy = 'createdAt', sortOrder = 'desc', archives = false } = req.query

            const news = await News.find(!archives ? { archiveDate: null } : {})
                .sort({ [sortBy]: sortOrder })
                .populate('author', ['name', 'lastname'])

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

            const news = await News.findById(id).populate('author')

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
            const { data, error } = await validateData(CreateNewsValidator, req.body)
            const { error: errorFile, file } = await validateImage(req.file)

            if (error) return res.status(400).json({ message: error.message, error: error.error })
            if (errorFile) return res.status(400).json({ message: errorFile.message, error: errorFile.error })
            if (!req.user) return res.status(404).json({ message: "User not found" })

            const { error: cloudinaryError, url } = await uploadImageCloudinary(file)
            if (cloudinaryError) res.status(400).json({ message: cloudinaryError.message, error: cloudinaryError.error })

            let updateData = data
            updateData = {
                ...updateData,
                image: url,
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

            const { data, error } = await validateData(UpdateNewsValidator, req.body)

            if (error) return res.status(400).json({ message: error.message, error: error.error })

            const updateData = data?.archived ? { archiveDate: new Date() } : { archiveDate: null }
            const news = await News.findByIdAndUpdate(id, updateData, { new: true })

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
            const userId = req.user
            const news = await News.findById(id).populate('author')

            if (!userId) return res.status(404).json({ message: "User not found" })
            else if (news?.author?.id !== userId) return res.status(401).json({ message: "Unauthorized user to delete news" })

            await news.deleteOne()

            return res.status(200).json({ message: "News deleted succesfully" })
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error: error
            })
        }
    }
}

export default NewControllers