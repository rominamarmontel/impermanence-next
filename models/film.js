import mongoose, { Schema, models } from 'mongoose'

const filmSchema = new Schema(
  {
    title: String,
    originalTitle: String,
    copyright: String,
    directedBy: String,
    producedBy: String,
    author: String,
    format: String,
    duration: String,
    synopsis: String,
    partner: String,
    createdYear: String,
    festivalsAndAwards: String,
    distribution: String,
    internationalSales: String,
    stageOfProduction: String,
    download: String,
    crew: String,
    genre: {
      type: String,
      enum: ['documentaire', 'drama', 'science-fiction', 'comedie'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    links: [
      {
        type: String,
      },
    ],
    imageData: {
      type: [
        {
          url: { type: String, default: '' },
          publicId: { type: String, default: '' },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

const Film = mongoose.models.Film || mongoose.model('Film', filmSchema)

export default Film
