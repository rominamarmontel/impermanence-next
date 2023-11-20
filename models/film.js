import mongoose, { Schema, models } from 'mongoose'

const filmSchema = new Schema(
  {
    title: {
      en: String,
      fr: String,
    },
    originalTitle: String,
    copyright: String,
    directedBy: String,
    producedBy: String,
    author: String,
    format: String,
    duration: String,
    synopsis: {
      en: String,
      fr: String,
    },
    partner: {
      en: String,
      fr: String,
    },
    createdYear: String,
    festivalAndAward: {
      en: String,
      fr: String,
    },
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
