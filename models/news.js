import mongoose, { Schema, models } from 'mongoose'

const NewsSchema = new Schema(
  {
    postTitle: String,
    post: String,
    imageUrl: String,
    publicId: String,
  },
  {
    timestamps: true,
  }
)
delete mongoose.models.News

const News = mongoose.models.New || mongoose.model('News', NewsSchema)

export default News
