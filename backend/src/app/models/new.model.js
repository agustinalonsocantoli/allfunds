import { Schema, model } from 'mongoose'

const newsSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        archiveDate: { type: Date, default: null, nullable: true },
        createdAt: { type: Date, default: Date.now }
    },
    {
        timestamps: false,
        versionKey: false
    }
)

const News = model('News', newsSchema)

export default News